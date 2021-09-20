import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

/** Time and timing curve for accordion item animations. */
export const ACCORDION_ITEM_ANIMATION_TIMING = '225ms linear';

export const UsaExpansionAnimations: {
  readonly bodyExpansion: AnimationTriggerMetadata;
} = {
  /** Animation that expands and collapses the accordion item content. */
  bodyExpansion: trigger('bodyExpansion', [
    state('collapsed, void', style({height: '0px', display: 'none', 'padding-top': 0, 'padding-bottom': 0})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed, void => collapsed',
      animate(ACCORDION_ITEM_ANIMATION_TIMING)),
  ])
};