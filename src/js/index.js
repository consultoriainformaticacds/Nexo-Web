document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nexoForm');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('nexo-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página salte
            
            const originalText = btn.innerText;
            const data = new FormData(form);
            
            // UX Visual: Botón procesando
            btn.innerText = "Procesando...";
            btn.disabled = true;
            btn.style.opacity = '0.7';
            if (status) status.innerHTML = ""; 

            try {
                // Enviamos a tu endpoint específico de Nexo Web
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Magia Visual Creativa
                    btn.innerText = "¡Asesoría Solicitada!";
                    btn.style.background = "var(--accent-pink)";
                    btn.style.color = "#fff";
                    btn.style.opacity = '1';
                    
                    if (status) {
                        status.innerHTML = "¡Gracias! Nuestro equipo creativo te contactará muy pronto.";
                        status.style.color = "var(--accent-pink)";
                    }
                    form.reset(); // Limpia los campos

                    // Volver a la normalidad en 5 seg
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = "var(--accent-gradient)";
                        btn.style.color = "white";
                        btn.disabled = false;
                        if (status) status.innerHTML = "";
                    }, 5000);

                } else {
                    const result = await response.json();
                    if (status) {
                        status.innerHTML = "Hubo un error: " + (result.errors ? result.errors[0].message : "Intenta nuevamente");
                        status.style.color = "#ff4444"; 
                    }
                    throw new Error('Error de Formspree');
                }
            } catch (error) {
                // Plan B: Falla de red
                if (status && !status.innerHTML) {
                    status.innerHTML = "Error de conexión. Por favor, intenta más tarde.";
                    status.style.color = "#ff4444";
                }
                btn.style.borderColor = "#ff4444";
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "var(--accent-gradient)";
                    btn.style.borderColor = "transparent";
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 5000);
            }
        });
    }
});