/**
 * 
 */
export interface ReporterRecipe {
  onBegin?: () => void;
  onEnd?: () => void;
}

/**
 * 
 */
export class Reporter {
  protected recipe: ReporterRecipe;

  /**
   * 
   */
  public constructor(recipe?: ReporterRecipe) {
    this.recipe = recipe || {};
  }

}