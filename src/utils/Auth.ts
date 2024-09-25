import { logout } from '@/actions';
import { setProfile } from '@/lib/features/profile/Profile.slice';
import store from '@/lib/Store';

export const removeAuth = async (
  anyLoadingFunction?: (loading: boolean) => void
) => {
  try {
    if (anyLoadingFunction) anyLoadingFunction(true);

    await logout();
    store.dispatch(setProfile({}));
  } catch (error) {
    console.log('error : ', error);
  } finally {
    if (anyLoadingFunction) anyLoadingFunction(false);
  }
};
