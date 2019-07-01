import { Asset } from 'expo-asset';

export function loadAllAsset(): Promise<void[]> {
  return Asset.loadAsync([
    require('../assets/icons/list-active.png'),
    require('../assets/icons/list.png'),
    require('../assets/icons/jellyfish-active.png'),
    require('../assets/icons/jellyfish.png'),
    require('../assets/icons/calendar-active.png'),
    require('../assets/icons/calendar.png'),
    require('../assets/empty-list.png'),
    require('../assets/icons/plus.png'),
    require('../assets/3bg.jpg'),
    require('../assets/arrow-right.png'),
    require('../assets/arrow-top.png'),
    require('../assets/hello.png'),
    require('../assets/check.png')
  ]);
}
