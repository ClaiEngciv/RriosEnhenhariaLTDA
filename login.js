document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  const loginBox = document.querySelector('.login-box');

  const usuarioInput = document.getElementById('usuario');
  const senhaInput = document.getElementById('senha');
  const errorMsg = document.getElementById('loginError');

  const btn = form.querySelector('.primary-btn');
  const btnText = btn.querySelector('.btn-text');

  const remember = document.getElementById('rememberUser');
  const togglePass = document.querySelector('.toggle-pass');

  // Credenciais simuladas (interno do front-end)
  const USUARIO_CORRETO = 'Grado';
  const SENHA_CORRETA = '1234';

  // preencher usuário salvo (se existir)
  const savedUser = localStorage.getItem('rememberedUser');
  if (savedUser) {
    usuarioInput.value = savedUser;
    remember.checked = true;
  }

  // mostrar/ocultar senha
  togglePass.addEventListener('click', () => {
    const willShow = senhaInput.type === 'password';
    senhaInput.type = willShow ? 'text' : 'password';
    togglePass.textContent = willShow ? 'Ocultar' : 'Mostrar';
    togglePass.setAttribute('aria-pressed', String(willShow));
    togglePass.setAttribute('aria-label', willShow ? 'Ocultar senha' : 'Mostrar senha');
    senhaInput.focus();
  });

  function setLoading(state) {
    btn.disabled = state;
    btn.classList.toggle('is-loading', state);
    btnText.textContent = state ? 'Verificando...' : 'Entrar';
  }

  function showError(message) {
    errorMsg.textContent = message;
    loginBox.classList.add('is-error');
    window.setTimeout(() => loginBox.classList.remove('is-error'), 300);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.textContent = '';

    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!usuario || !senha) {
      showError('Preencha os campos para continuar.');
      (!usuario ? usuarioInput : senhaInput).focus();
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      const ok = (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA);

      if (ok) {
        localStorage.setItem('usuarioLogado', usuario);

        if (remember.checked) localStorage.setItem('rememberedUser', usuario);
        else localStorage.removeItem('rememberedUser');

        window.location.href = 'cliente.html';
        return;
      }

      setLoading(false);
      showError('Usuário ou senha inválidos.');
      senhaInput.value = '';
      senhaInput.focus();
    }, 700);
  });
});
