<?php
// chat-proxy.php

// --- RATE LIMIT START ---
$limit_file = __DIR__ . '/rate_limit_db.json';
$ip = $_SERVER['REMOTE_ADDR'];
$now = time();
$limit_window = 3600; // Zeitfenster: 1 Stunde (in Sekunden)
$max_requests = 20;   // Erlaubte Fragen pro Stunde

// Lade bestehende Daten
$data = file_exists($limit_file) ? json_decode(file_get_contents($limit_file), true) : [];

// Alte Einträge löschen (außerhalb des Zeitfensters)
if (!is_array($data)) $data = [];
$data = array_filter($data, function($timestamp) use ($now, $limit_window) {
    return $timestamp > ($now - $limit_window);
});

// Zähle Anfragen für diese IP
$user_requests = array_filter($data, function($val) use ($ip) {
    return $val === $ip;
});

if (count($user_requests) >= $max_requests) {
    header("Content-Type: application/json");
    http_response_code(429); // Too Many Requests
    echo json_encode([
        "error" => "Rate limit reached", 
        "message" => "Du hast das Limit von $max_requests Fragen pro Stunde erreicht. Bitte versuche es später erneut."
    ]);
    exit;
}

// Aktuelle Anfrage hinzufügen und speichern
$data[] = $ip;
file_put_contents($limit_file, json_encode($data));
// --- RATE LIMIT ENDE ---


// 1. Sicherheit: Nur Anfragen von deiner eigenen Domain erlauben
header("Access-Control-Allow-Origin: https://marcopalummieri.de/");
header("Content-Type: application/json");

// 2. Deine versteckte n8n URL
$n8nWebhookUrl = 'https://n8n.marcopalummieri.de/webhook/138e6ea1-ec82-4503-9126-0f74d9b88a99/chat';

// 3. Die eingehenden Daten vom Angular-Frontend lesen
$input = file_get_contents('php://input');

// 4. Die Anfrage per cURL an n8n weiterleiten
$ch = curl_init($n8nWebhookUrl);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($input)
));

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// 5. Fehlerbehandlung
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxy Error: ' . curl_error($ch)]);
} else {
    http_response_code($httpCode);
    echo $result;
}

?>