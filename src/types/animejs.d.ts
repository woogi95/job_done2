declare module "animejs" {
  export interface AnimeParams {
    progress: number;
  }

  export function timeline(params: any): any;
  export function set(element: Element | null, params: any): void;
}
