import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LsKeys } from '@shared/constants';

export interface UserSchema {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserSchema = {
  accessToken: localStorage.getItem(LsKeys.ACCESS_TOKEN),
  refreshToken: localStorage.getItem(LsKeys.REFRESH_TOKEN),
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload;
      localStorage.setItem(LsKeys.ACCESS_TOKEN, payload);
    },
    setRefreshToken(state, { payload }: PayloadAction<string>) {
      state.refreshToken = payload;
      localStorage.setItem(LsKeys.REFRESH_TOKEN, payload);
    },
    clear() {
      localStorage.removeItem(LsKeys.ACCESS_TOKEN);
      localStorage.removeItem(LsKeys.REFRESH_TOKEN);

      return {
        ...initialState,
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
