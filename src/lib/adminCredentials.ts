import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface AdminCredentials {
  login: string;
  password: string;
  updatedAt: Date;
}

const ADMIN_CREDENTIALS_DOC = 'admin_credentials/credentials';

// Получить учетные данные администратора
export const getAdminCredentials = async (): Promise<AdminCredentials | null> => {
  try {
    const docRef = doc(db, ADMIN_CREDENTIALS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        login: data.login,
        password: data.password,
        updatedAt: data.updatedAt?.toDate() || new Date()
      };
    }
    
    // Если документ не существует, создаем с дефолтными значениями
    const defaultCredentials = {
      login: 'admin',
      password: 'admin',
      updatedAt: new Date()
    };
    
    await setDoc(docRef, {
      ...defaultCredentials,
      updatedAt: defaultCredentials.updatedAt
    });
    
    return defaultCredentials;
  } catch (error) {
    console.error('Ошибка получения учетных данных:', error);
    return null;
  }
};

// Обновить учетные данные администратора
export const updateAdminCredentials = async (login: string, password: string): Promise<boolean> => {
  try {
    const docRef = doc(db, ADMIN_CREDENTIALS_DOC);
    await setDoc(docRef, {
      login,
      password,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Ошибка обновления учетных данных:', error);
    return false;
  }
};

// Слушать изменения учетных данных в реальном времени
export const subscribeToAdminCredentials = (
  callback: (credentials: AdminCredentials | null) => void
) => {
  const docRef = doc(db, ADMIN_CREDENTIALS_DOC);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        login: data.login,
        password: data.password,
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Ошибка подписки на изменения учетных данных:', error);
    callback(null);
  });
};

// Проверить учетные данные
export const validateAdminCredentials = async (inputLogin: string, inputPassword: string): Promise<boolean> => {
  const credentials = await getAdminCredentials();
  if (!credentials) return false;
  
  return credentials.login === inputLogin && credentials.password === inputPassword;
};
