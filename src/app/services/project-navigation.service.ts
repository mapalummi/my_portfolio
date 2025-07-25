import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Interface representing a project for navigation.
 */
interface Project {
  id: string;
  name: string;
  route: string;
}

/**
 * Service for navigating between portfolio projects.
 * Provides methods to get projects, determine current/next/previous projects, and navigate accordingly.
 */
@Injectable({
  providedIn: 'root',
})
export class ProjectNavigationService {
  /** List of available projects for navigation. */
  private projects: Project[] = [
    { id: 'join', name: 'Join', route: '/join' },
    { id: 'da-bubble', name: 'DA Bubble', route: '/daBubble' },
    { id: 'el-pollo-loco', name: 'El Pollo Loco', route: '/elPolloLoco' },
  ];

  /**
   * Creates an instance of ProjectNavigationService.
   * @param router Angular Router for navigation.
   */
  constructor(private router: Router) {}

  /**
   * Returns the list of all projects.
   * @returns Array of Project objects.
   */
  getProjects(): Project[] {
    return this.projects;
  }

  /**
   * Returns the current project based on the route.
   * @param route The current route string.
   * @returns The matching Project object or undefined.
   */
  getCurrentProject(route: string): Project | undefined {
    return this.projects.find((p) => p.route === route || route.includes(p.id));
  }

  /**
   * Returns the next project in the list, cycling to the start if at the end.
   * @param currentRoute The current route string.
   * @returns The next Project object.
   */
  getNextProject(currentRoute: string): Project {
    const currentIndex = this.projects.findIndex(
      (p) => p.route === currentRoute || currentRoute.includes(p.id)
    );
    const nextIndex = (currentIndex + 1) % this.projects.length;
    return this.projects[nextIndex];
  }

  /**
   * Returns the previous project in the list, cycling to the end if at the start.
   * @param currentRoute The current route string.
   * @returns The previous Project object.
   */
  getPreviousProject(currentRoute: string): Project {
    const currentIndex = this.projects.findIndex(
      (p) => p.route === currentRoute || currentRoute.includes(p.id)
    );
    const prevIndex =
      currentIndex <= 0 ? this.projects.length - 1 : currentIndex - 1;
    return this.projects[prevIndex];
  }

  /**
   * Navigates to the next project based on the current route.
   * @param currentRoute The current route string.
   */
  navigateToNext(currentRoute: string): void {
    const nextProject = this.getNextProject(currentRoute);
    this.router.navigate([nextProject.route]);
  }

  /**
   * Navigates to the previous project based on the current route.
   * @param currentRoute The current route string.
   */
  navigateToPrevious(currentRoute: string): void {
    const prevProject = this.getPreviousProject(currentRoute);
    this.router.navigate([prevProject.route]);
  }
}
