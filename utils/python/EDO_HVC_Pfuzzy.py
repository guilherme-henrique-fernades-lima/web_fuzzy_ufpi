import numpy as np
from scipy.integrate import solve_ivp
import skfuzzy as fuzz
from skfuzzy import control as ctrl

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

def EDO_HVC_Pfuzzy(t, P, simulador):
   
    # print('simulador >>>> ', simulador)

    P = np.array(P)

    resto = t % 360
    # print('resto: ', resto)
    if resto < 180:
        tau = resto
        # print('1 - tau: ', tau)
    else:
        tau = 359 - resto
        # print('2 - tau: ', tau)

    p = P[2] + P[3]   

    # print('P >>>>>> ', P)   
    # print('p >>>>>> ', p)   
    # print('tau >>>> ', tau)      

    #DATA = [0.7  0.   0.24 0.01 0.6  0.  ]

    # Configurar as entradas do simulador
    simulador.input['flebotomineos'] = p
    simulador.input['cond_ambiental'] = tau

    # Computar o resultado (Inferência Fuzzy + Defuzzificação)
    simulador.compute()

    # Obter o valor da variável de saída
    var_value = simulador.output['variacao']
    print('var: ', var_value)

    # Avaliar as funções de pertinência usando scikit-fuzzy
    # var_pertinence = fuzz.interp_membership(universe_flebotomineos, p, 'p')
    # var_pertinence = fuzz.interp_membership(universe_flebotomineos, 'baixo', p)
    # tau_pertinence = fuzz.interp_membership(universe_cond_ambiental, tau, 'tau')

    #var_pertinence = fuzz.interp_membership(simulador.input['flebotomineos'].universe, p, simulador.input['flebotomineos'].terms)
    #tau_pertinence = fuzz.interp_membership(simulador.input['cond_ambiental'].universe, tau, simulador.input['cond_ambiental'].terms)

    # Calcular o valor usando os graus de pertinência
    #var = fuzz.defuzz(simulador.output['variacao'].universe, var_pertinence, 'centroid')

    # Calcular o valor usando os graus de pertinência
    #var_value = fuzz.defuzz(simulador.ctrl.consequents['variacao'].universe, var_pertinence, 'centroid')

    dPdt = [
        r_h * (P[0] + P[1]) * (1 - (P[0] + P[1]) / k_h) - alpha_h * P[0] * (P[3] / (P[2] + P[3])) + gamma_h * P[1] - mu_h * P[0],
        alpha_h * P[0] * (P[3] / (P[2] + P[3])) - gamma_h * P[1] - (mu_h + d_h) * P[1],
        var_value - beta_h * P[2] * (P[1] / (P[0] + P[1])) - beta_c * P[2] * (P[5] / (P[4] + P[5])) + mu_f * P[3],
        beta_h * P[2] * (P[1] / (P[0] + P[1])) + beta_c * P[2] * (P[5] / (P[4] + P[5])) - mu_f * P[3],
        r_c * P[4] * (1 - (P[4] + P[5]) / k_c) - alpha_c * P[4] * (P[3] / (P[2] + P[3])) - mu_c * P[4],
        alpha_c * P[4] * (P[3] / (P[2] + P[3])) - (mu_c + d_c) * P[5]
    ]

    print('dPdt: ',dPdt)

    return dPdt
