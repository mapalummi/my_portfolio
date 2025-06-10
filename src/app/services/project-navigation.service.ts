import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

interface Project {
  id: string;
  name: string;
  route: string,
}

@Injectable({
  providedIn: 'root'
})
export class ProjectNavigationService {
  private projects: Project[] = [
    { id: 'join', name: 'Join', route: '/join' },
    { id: 'da-bubble', name: 'DA Bubble', route: '/daBubble' },
    { id: 'el-pollo-loco', name: 'El Pollo Loco', route: '/elPolloLoco' }
  ];

  constructor(private router: Router) { }

  getProjects(): Project[] {
    return this.projects;
  }

  getCurrentProject(route: string): Project | undefined {
    return this.projects.find(p => p.route === route || route.includes(p.id));
  }

  getNextProject(currentRoute: string): Project {
    const currentIndex = this.projects.findIndex(p => 
      p.route === currentRoute || currentRoute.includes(p.id)
    );
    const nextIndex = (currentIndex + 1) % this.projects.length;
    return this.projects[nextIndex];
  }

  getPreviousProject(currentRoute: string): Project {
    const currentIndex = this.projects.findIndex(p => 
      p.route === currentRoute || currentRoute.includes(p.id)
    );
    const prevIndex = (currentIndex <= 0) ? this.projects.length - 1 : currentIndex - 1;
    return this.projects[prevIndex];
  }

  navigateToNext(currentRoute: string): void {
    const nextProject = this.getNextProject(currentRoute);
    this.router.navigate([nextProject.route]);
  }

  navigateToPrevious(currentRoute: string): void {
    const prevProject = this.getPreviousProject(currentRoute);
    this.router.navigate([prevProject.route]);
  }
}
