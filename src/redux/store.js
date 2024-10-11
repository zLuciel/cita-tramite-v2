// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './user/user';
import { DashboardReducer } from './dashboard/dashboard';
import { DocumentsReducer } from './documents/documents';


const store = configureStore({
  reducer: {
    UserClientRedux: UserReducer,
    DashboarAdmidRedux: DashboardReducer,
    DocumentsGlobalRedux: DocumentsReducer,
    // puedes agregar más slices aquí
  },
});

export default store;
