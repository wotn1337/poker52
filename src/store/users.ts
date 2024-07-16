import { BaseUser } from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UsersState = {
  addScoreModal: {
    open: boolean;
    userId?: BaseUser["_id"];
  };
};

const initialState: UsersState = { addScoreModal: { open: false } };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAddScoreModal: (
      state,
      action: PayloadAction<UsersState["addScoreModal"]>
    ) => {
      state.addScoreModal = action.payload;
    },
  },
});

export const { setAddScoreModal } = usersSlice.actions;
export default usersSlice.reducer;
