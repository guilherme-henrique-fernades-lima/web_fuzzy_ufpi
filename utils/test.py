import numpy as np
import matplotlib.pyplot as plt

# Simulacao 01 - Humano, Flebotomineo, Caes.
# Parametros: Shimizako-2017, Song-2020, Larenti-2013 e Seva-2016.
# Fonte vital dos Flebotomineos P-fuzzy periodica.
# Obs.: Considerou-se as populacoes normalizadas.

# Tempo
ano = 5
tspan = np.linspace(0, ano * 360, ano * 360 + 1)

# PARAMETROS
b = 1e-2

# HUMANOS
r_h = 1.9e-2
k_h = 1
a_h = 2e-1
m_h = 0.75
alpha_h = a_h * b * m_h  # alpha_h = a_h * b;
mu_h = 3.67e-5
d_h = 6.31e-3
gamma_h = 2.5e-3

# CAES
r_c = 2.96e-1
k_c = 1
a_c = 2e-1
m_c = (10 / 1.8) * m_h
alpha_c = a_c * b * m_c  # alpha_c = a_c * b;
mu_c = 2.28e-4
d_c = 1.81e-3

# FLEBOTOMINEOS
r_f = 2e-1
k_f = 1
b_hf = 1.2e-2
beta_h = a_h * b_hf
b_cf = 30.6e-2
beta_c = a_c * b_cf
mu_f = 5e-2

# Condições iniciais
initial_conditions = [0.5, 0.5, 0.5]

# Definição do sistema de equações diferenciais
def system(t, y):
    H, C, F = y
    dHdt = r_h * H * (1 - (H + alpha_h * F) / k_h) - mu_h * H - gamma_h * H * F
    dCdt = r_c * C * (1 - (C + alpha_c * F) / k_c) - mu_c * C
    dFdt = r_f * F * (1 - (F + beta_h * H + beta_c * C) / k_f) - mu_f * F
    return [dHdt, dCdt, dFdt]

# Resolução do sistema de equações diferenciais
from scipy.integrate import odeint

solution = odeint(system, initial_conditions, tspan)

# Plotagem dos resultados
plt.plot(tspan, solution[:, 0], label='Humanos')
plt.plot(tspan, solution[:, 1], label='Caes')
plt.plot(tspan, solution[:, 2], label='Flebotomineos')
plt.xlabel('Tempo')
plt.ylabel('Populacao Normalizada')
plt.legend()
plt.show()
