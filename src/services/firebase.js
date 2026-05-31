import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { 
  API_KEY, 
  AUTH_DOMAIN, 
  PROJECT_ID, 
  STORAGE_BUCKET, 
  MESSAGING_SENDER_ID, 
  APP_ID 
} from '@env';
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const resetarSenha = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    let errorMessage = 'Erro ao enviar e-mail de recuperação.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Nenhum usuário encontrado com este e-mail.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'E-mail inválido.';
    }
    return { success: false, error: errorMessage };
  }
};

export const registrarUsuario = async (email, senha, nome, peso, altura, idade, cidade, genero) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    await setDoc(doc(db, 'usuarios', user.uid), {
      nome: nome,
      email: email,
      peso: peso,
      altura: altura,
      idade: idade,
      cidade: cidade,
      genero: genero,
      foto: `https://randomuser.me/api/portraits/${genero === 'Feminino' ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`,
      dataCadastro: new Date().toISOString(),
      estatisticas: {
        denunciasResolvidas: 0,
        empresasInclusivas: 0,
        economiaFuneral: 0,
        matchesAmor: 0,
        locaisVisitados: 0,
      },
      conquistas: [
        { id: 1, nome: 'Primeira Denúncia', icone: '⚡', desbloqueado: false },
        { id: 2, nome: 'Apoiador Plus', icone: '❤️', desbloqueado: false },
        { id: 3, nome: 'Comunidade Ativa', icone: '💬', desbloqueado: false },
        { id: 4, nome: 'Indenização Conquistada', icone: '💰', desbloqueado: false },
      ],
      historico: [],
    });

    return { success: true, user: user, uid: user.uid };
  } catch (error) {
    console.error('Erro no registro:', error);
    let errorMessage = 'Erro ao cadastrar. Tente novamente.';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Este e-mail já está cadastrado.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
    }
    return { success: false, error: errorMessage };
  }
};

export const loginUsuario = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    
    const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { success: true, user: user, userData: userData, uid: user.uid };
    } else {
      return { 
        success: true, 
        user: user, 
        userData: {
          nome: email.split('@')[0],
          email: email,
          peso: '0kg',
          altura: '0m',
          idade: 0,
          cidade: 'Não informado',
          genero: 'Não informado',
          foto: 'https://randomuser.me/api/portraits/lego/1.jpg',
          estatisticas: {
            denunciasResolvidas: 0,
            empresasInclusivas: 0,
            economiaFuneral: 0,
            matchesAmor: 0,
            locaisVisitados: 0,
          },
          conquistas: [
            { id: 1, nome: 'Primeira Denúncia', icone: '⚡', desbloqueado: false },
            { id: 2, nome: 'Apoiador Plus', icone: '❤️', desbloqueado: false },
            { id: 3, nome: 'Comunidade Ativa', icone: '💬', desbloqueado: false },
            { id: 4, nome: 'Indenização Conquistada', icone: '💰', desbloqueado: false },
          ],
          historico: []
        }, 
        uid: user.uid 
      };
    }
  } catch (error) {
    console.error('Erro no login:', error);
    let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Usuário não encontrado.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Senha incorreta.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'E-mail inválido.';
    }
    return { success: false, error: errorMessage };
  }
};

export const logoutUsuario = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Erro no logout:', error);
    return { success: false, error: error.message };
  }
};

export const registrarDenuncia = async (userId, denunciaData) => {
  try {
    const denuncia = {
      ...denunciaData,
      userId: userId,
      data: new Date().toISOString(),
      status: 'pendente',
      protocolo: `PLUS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    
    await addDoc(collection(db, 'denuncias'), denuncia);
    
    const userRef = doc(db, 'usuarios', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    await updateDoc(userRef, {
      'estatisticas.denunciasResolvidas': (userData.estatisticas.denunciasResolvidas || 0) + 1,
      historico: [
        {
          id: Date.now(),
          tipo: 'Denúncia',
          descricao: denunciaData.descricao.substring(0, 50),
          data: new Date().toISOString(),
          status: 'pendente',
        },
        ...(userData.historico || []),
      ].slice(0, 10),
    });
    
    if ((userData.estatisticas.denunciasResolvidas || 0) + 1 >= 1) {
      const conquistasAtualizadas = userData.conquistas.map(conq => 
        conq.nome === 'Primeira Denúncia' ? { ...conq, desbloqueado: true } : conq
      );
      await updateDoc(userRef, { conquistas: conquistasAtualizadas });
    }
    
    return { success: true, protocolo: denuncia.protocolo };
  } catch (error) {
    console.error('Erro ao registrar denúncia:', error);
    return { success: false, error: error.message };
  }
};

export const buscarDenuncias = async (userId) => {
  try {
    const q = query(collection(db, 'denuncias'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const denuncias = [];
    querySnapshot.forEach((doc) => {
      denuncias.push({ id: doc.id, ...doc.data() });
    });
    return denuncias;
  } catch (error) {
    console.error('Erro ao buscar denúncias:', error);
    return [];
  }
};

// Funções para Comunidade
export const buscarDepoimentos = async () => {
  try {
    const q = query(collection(db, 'depoimentos'));
    const querySnapshot = await getDocs(q);
    const depoimentos = [];
    querySnapshot.forEach((doc) => {
      depoimentos.push({ id: doc.id, ...doc.data() });
    });
    return depoimentos.length > 0 ? depoimentos : [
      { id: 1, nome: 'Carla Silva', texto: 'Consegui minha cadeira adaptada na faculdade!', likes: 342, data: '15/05/2024' },
      { id: 2, nome: 'Marcos Oliveira', texto: 'Fui contratado pela Magazine Luiza!', likes: 567, data: '20/05/2024' },
    ];
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return [
      { id: 1, nome: 'Carla Silva', texto: 'Consegui minha cadeira adaptada na faculdade!', likes: 342, data: '15/05/2024' },
      { id: 2, nome: 'Marcos Oliveira', texto: 'Fui contratado pela Magazine Luiza!', likes: 567, data: '20/05/2024' },
    ];
  }
};

export const adicionarDepoimento = async (userId, nome, texto) => {
  try {
    const depoimento = {
      userId: userId,
      nome: nome,
      texto: texto,
      likes: 0,
      data: new Date().toISOString(),
    };
    await addDoc(collection(db, 'depoimentos'), depoimento);
    return { success: true };
  } catch (error) {
    console.error('Erro ao adicionar depoimento:', error);
    return { success: false, error: error.message };
  }
};

export default { auth, db, registrarUsuario, loginUsuario, logoutUsuario, resetarSenha, registrarDenuncia, buscarDenuncias, buscarDepoimentos, adicionarDepoimento };