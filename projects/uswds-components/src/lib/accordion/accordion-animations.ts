import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

/** Time and timing curve for accordion item animations. */
export const ACCORDION_ITEM_ANIMATION_TIMING = '225ms cubic-bezier(0.7,0.0,0.7,1)';

export const UsaExpansionAnimations: {
  readonly bodyExpansion: AnimationTriggerMetadata;
} = {
  /** Animation that expands and collapses the accordion item content. */
  bodyExpansion: trigger('bodyExpansion', [
    state('collapsed, void', style({height: '0px', display: 'none'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed, void => collapsed',
      animate(ACCORDION_ITEM_ANIMATION_TIMING)),
  ])
};