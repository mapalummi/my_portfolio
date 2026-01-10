<?php
// chat-proxy.php

// 1. Sicherheit: Nur Anfragen von deiner eigenen Domain erlauben
// (Optional: All-Inkl setzt das oft schon korrekt, aber explizit ist sicherer)
header("Access-Control-Allow-Origin: https://deine-website.de"); 
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