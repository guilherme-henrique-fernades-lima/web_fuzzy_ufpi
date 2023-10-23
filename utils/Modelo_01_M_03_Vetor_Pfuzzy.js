// Definindo as variáveis globais
var r_h, k_h, alpha_h, gamma_h, mu_h, d_h, r_c, k_c, alpha_c, mu_c, d_c, r_f, k_f, beta_h, beta_c, mu_f;

// Tempo
var ano = 5;
var tspan = [];

for (var i = 0; i <= ano * 360; i++) {
    tspan.push(i);
}

// Parâmetros
var b = 1e-2;

// HUMANOS
r_h = 1.9e-2;
k_h = 1;
var a_h = 2e-1;
var m_h = 0.75;
alpha_h = a_h * b * m_h;
mu_h = 3.67e-5;
d_h = 6.31e-3;
gamma_h = 2.5e-3;

// CAES
r_c = 2.96e-1;
k_c = 1;
var a_c = 2e-1;
var m_c = (10 / 1.8) * m_h;
alpha_c = a_c * b * m_c;
mu_c = 2.28e-4;
d_c = 1.81e-3;

// FLEBOTOMINEOS
r_f = 2e-1;
k_f = 1;
var b_hf = 1.2e-2;
beta_h = a_h * b_hf;
var b_cf = 30.6e-2;
beta_c = a_c * b_cf;
mu_f = 5e-2;

// Condição inicial
var P0 = [0.7, 0, 0.24, 0.01, 0.6, 0];

// Controlador fuzzy (simulado)
var dados_var = {}; // Defina seus dados fuzzy aqui

// Solução da EDO (simulado)
var t = [];
var P = [];

var options = { Abstol: 1e-6, Reltol: 1e-6 };

for (var i = 0; i < tspan.length; i++) {
    // Implemente sua própria lógica para resolver as equações diferenciais aqui
    // Não há uma função direta equivalente ao `ode45` do MATLAB em JavaScript.
    // Você precisará implementar métodos numéricos ou usar bibliotecas externas.
}

// Não é possível executar a parte de plotagem diretamente em JavaScript,
// pois a plotagem é específica do MATLAB.
