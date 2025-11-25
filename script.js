document.addEventListener('DOMContentLoaded', () => {
    // Elementos comuns a todas as páginas
    const loginButton = document.getElementById('login-button');
    const usernameDisplay = document.getElementById('username-display');
    const navProfileLink = document.getElementById('nav-profile-link');
    
    // Elementos da página de perfil (profile.html)
    const currentUsernameText = document.getElementById('current-username-text');
    const newUsernameInput = document.getElementById('new-username-input');
    const saveUsernameButton = document.getElementById('save-username-button');
    const feedbackMessage = document.getElementById('feedback-message');
    const profileLogoutButton = document.getElementById('profile-logout-button');

    // 1. CARREGAR E ATUALIZAR INTERFACE
    function loadUser() {
        const username = localStorage.getItem('dlx_username');
        const isLoggedIn = !!username;

        // Atualiza Header em TODAS as páginas
        if (isLoggedIn) {
            const displayName = username.length > 15 ? username.substring(0, 15) + '...' : username;
            
            usernameDisplay.textContent = `Olá, ${displayName}!`;
            usernameDisplay.style.display = 'inline';
            loginButton.textContent = 'Ver Perfil';
            loginButton.classList.add('logged-in');
            
            // Mostra link "Meu Perfil" na NAV
            if(navProfileLink) navProfileLink.style.display = 'inline';
            
        } else {
            usernameDisplay.style.display = 'none';
            loginButton.textContent = 'Login/Cadastre-se';
            loginButton.classList.remove('logged-in');
            
            // Esconde link "Meu Perfil" na NAV
            if(navProfileLink) navProfileLink.style.display = 'none';
        }
        
        // Atualiza a página de perfil (só se estiver nela)
        if (currentUsernameText) {
            currentUsernameText.textContent = isLoggedIn ? username : "Nenhum usuário logado.";
            newUsernameInput.value = isLoggedIn ? username : "";
        }
    }

    // 2. FUNÇÃO DE LOGIN/REDIRECIONAMENTO (Header Button)
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const username = localStorage.getItem('dlx_username');

            if (username) {
                // Se estiver logado, redireciona para o Perfil
                window.location.href = 'profile.html';
                
            } else {
                // Se não estiver logado, faz o Login/Cadastro Ilustrativo
                let newUsername = prompt("Qual é o seu nome de usuário? (Para Login Ilustrativo):");
                
                if (newUsername) {
                    newUsername = newUsername.trim();
                    if (newUsername.length > 0) {
                        localStorage.setItem('dlx_username', newUsername);
                        console.log(`Usuário logado: ${newUsername}.`);
                        loadUser();
                        // Redireciona após o login
                        window.location.href = 'profile.html';
                    } else {
                        alert("O nome de usuário não pode ser vazio.");
                    }
                }
            }
        });
    }
    
    // 3. LÓGICA DA PÁGINA DE PERFIL (profile.html)
    
    // 3.1. Troca de Nome
    if (saveUsernameButton) {
        saveUsernameButton.addEventListener('click', () => {
            const newName = newUsernameInput.value.trim();

            if (newName.length > 0) {
                localStorage.setItem('dlx_username', newName);
                loadUser(); // Atualiza a página com o novo nome
                console.log(`Nome de usuário alterado para: ${newName}.`);
                
                // Feedback visual de sucesso
                feedbackMessage.textContent = "Nome atualizado com sucesso!";
                feedbackMessage.style.color = 'var(--cor-primaria)';
                feedbackMessage.style.display = 'block';
                setTimeout(() => {
                    feedbackMessage.style.display = 'none';
                }, 3000);

            } else {
                feedbackMessage.textContent = "O nome não pode ser vazio!";
                feedbackMessage.style.color = 'red';
                feedbackMessage.style.display = 'block';
            }
        });
    }

    // 3.2. Botão Sair da Página de Perfil
    if (profileLogoutButton) {
        profileLogoutButton.addEventListener('click', () => {
            localStorage.removeItem('dlx_username');
            console.log("Usuário deslogado.");
            // Redireciona para a home após o logout
            window.location.href = 'index.html'; 
        });
    }

    // 4. ESTÉTICA DA BARRA DE FILTROS (news.html) - SÓ ATIVIDADE VISUAL SIMPLES
    const filterTags = document.querySelectorAll('.filter-bar-container .filter-tag');
    if (filterTags) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Remove 'active' de todas as tags
                filterTags.forEach(t => t.classList.remove('active'));
                // Adiciona 'active' na tag clicada (apenas visualmente)
                tag.classList.add('active');
                console.log(`Filtro clicado: ${tag.textContent}. (Ação visual/estética)`);
            });
        });
    }

    // Inicia a função de carregar o usuário
    loadUser();
});