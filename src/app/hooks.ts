//Create custom hooks to use Redux's useDispatch and useSelector hooks with TypeScript, ensuring proper typing for your application's state and dispatch functions.

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

//types to define  the structure of application's global state and the dispatch function type.
import type { RootState, AppDispatch } from './store';

//Custom hook named useAppDispatch, which is a typed version of the original useDispatch hook from react-redux. It ensures that when you use useAppDispatch in your components, you get the correct dispatch function type (AppDispatch).
export const useAppDispatch: () => AppDispatch = useDispatch;

//Creates custom hook useAppSelector. It's a typed version of the useSelector hook from react-redux. It uses the TypedUseSelectorHook type and specifies the RootState type as the generic argument. This ensures that when  use useAppSelector in components, it knows the structure of your application's global state and provides proper type checking.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
