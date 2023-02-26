import { Action, AnyAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, State } from "./index";

export const useAppDispatch = (): AppDispatch => useDispatch();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

interface RejectedAction extends Action {
  error: Error;
}

export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}
