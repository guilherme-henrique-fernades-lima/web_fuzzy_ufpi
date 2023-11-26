import numpy as np
from scipy.integrate import solve_ivp
import skfuzzy as fuzz
from skfuzzy import control as ctrl
from EDO_HVC_Pfuzzy import EDO_HVC_Pfuzzy

# Tempo
ano = 5
tspan = np.linspace(0, ano * 360, ano * 360 + 1)


# Definindo as variáveis de entrada e saída
flebotomineos = ctrl.Antecedent(np.linspace(0, 1, 1000), 'flebotomineos') 
cond_ambiental = ctrl.Antecedent(np.linspace(0, 180, 1000), 'cond_ambiental') 
variacao = ctrl.Consequent(np.linspace(-0.0015, 0.0015, 1000), 'variacao') 


# Funções de pertinência para 'Flebotomineos'
flebotomineos['baixo'] = fuzz.trapmf(flebotomineos.universe, [-2, -0.25, 0.1, 0.3022])
flebotomineos['medio_baixo'] = fuzz.trimf(flebotomineos.universe, [0.1, 0.3, 0.55])
flebotomineos['medio'] = fuzz.trimf(flebotomineos.universe, [0.3, 0.55, 0.7])
flebotomineos['medio_alto'] = fuzz.trimf(flebotomineos.universe, [0.55, 0.7, 0.8])
flebotomineos['alto'] = fuzz.trimf(flebotomineos.universe, [0.7, 0.8, 0.9])
flebotomineos['muito_alto'] = fuzz.trapmf(flebotomineos.universe, [0.8, 0.9, 1.1, 5])

# Funções de pertinência para 'Cond.ambiental'
cond_ambiental['deficientemente_favoravel'] = fuzz.trapmf(cond_ambiental.universe, [-14, -10, 60, 90])
cond_ambiental['parcialmente_favoravel'] = fuzz.trimf(cond_ambiental.universe, [60, 90, 120])
cond_ambiental['favoravel'] = fuzz.trapmf(cond_ambiental.universe, [90, 120, 190, 200])

# Funções de pertinência para saída 'Variacao'
variacao['baixo_negativo'] = fuzz.trapmf(variacao.universe, [-0.00075, -0.0001875, 0, 0])
variacao['baixo_positivo'] = fuzz.trapmf(variacao.universe, [0, 0, 0.0001875, 0.00075])
variacao['medio_positivo'] = fuzz.trimf(variacao.universe, [0.000375, 0.00075, 0.001125])
variacao['alto_positivo'] = fuzz.trapmf(variacao.universe, [0.00075, 0.001125, 0.0015, 0.02])
variacao['medio_negativo'] = fuzz.trimf(variacao.universe, [-0.001125, -0.00075, -0.000375])
variacao['alto_negativo'] = fuzz.trapmf(variacao.universe, [-0.02, -0.0015, -0.001125, -0.00075])


# Visualizando as funções de pertinência para cada variável
# flebotominios.view()
# cond_ambiental.view()
# variacao.view()

# [3] Inferência Fuzzy e Defuzzificação
# Base de Conhecimento/Regras
rule1 = ctrl.Rule(flebotomineos['baixo'] & cond_ambiental['deficientemente_favoravel'], variacao['baixo_positivo'])
rule2 = ctrl.Rule(flebotomineos['baixo'] & cond_ambiental['parcialmente_favoravel'], variacao['baixo_positivo'])
rule3 = ctrl.Rule(flebotomineos['baixo'] & cond_ambiental['favoravel'], variacao['baixo_positivo'])
rule4 = ctrl.Rule(flebotomineos['medio_baixo'] & cond_ambiental['deficientemente_favoravel'], variacao['baixo_negativo'])
rule5 = ctrl.Rule(flebotomineos['medio_baixo'] & cond_ambiental['parcialmente_favoravel'], variacao['baixo_positivo'])
rule6 = ctrl.Rule(flebotomineos['medio_baixo'] & cond_ambiental['favoravel'], variacao['medio_positivo'])
rule7 = ctrl.Rule(flebotomineos['medio'] & cond_ambiental['deficientemente_favoravel'], variacao['medio_negativo'])
rule8 = ctrl.Rule(flebotomineos['medio'] & cond_ambiental['parcialmente_favoravel'], variacao['baixo_negativo'])
rule9 = ctrl.Rule(flebotomineos['medio'] & cond_ambiental['favoravel'], variacao['alto_positivo'])
rule10 = ctrl.Rule(flebotomineos['medio_alto'] & cond_ambiental['deficientemente_favoravel'], variacao['medio_negativo'])
rule11 = ctrl.Rule(flebotomineos['medio_alto'] & cond_ambiental['parcialmente_favoravel'], variacao['baixo_negativo'])
rule12 = ctrl.Rule(flebotomineos['medio_alto'] & cond_ambiental['favoravel'], variacao['alto_positivo'])
rule13 = ctrl.Rule(flebotomineos['alto'] & cond_ambiental['deficientemente_favoravel'], variacao['alto_negativo'])
rule14 = ctrl.Rule(flebotomineos['alto'] & cond_ambiental['parcialmente_favoravel'], variacao['baixo_negativo'])
rule15 = ctrl.Rule(flebotomineos['alto'] & cond_ambiental['favoravel'], variacao['alto_positivo'])
rule16 = ctrl.Rule(flebotomineos['muito_alto'] & cond_ambiental['deficientemente_favoravel'], variacao['alto_negativo'])
rule17 = ctrl.Rule(flebotomineos['muito_alto'] & cond_ambiental['parcialmente_favoravel'], variacao['baixo_negativo'])
rule18 = ctrl.Rule(flebotomineos['muito_alto'] & cond_ambiental['favoravel'], variacao['baixo_negativo'])

# Sistema Fuzzy e Simulação
dados_var = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10, rule11, rule12, rule13, rule14, rule15, rule16, rule17, rule18])
simulador = ctrl.ControlSystemSimulation(dados_var)

# validade_simulador.input['flebotomineos'] = 2
# validade_simulador.input['cond_ambiental'] = 120 

# Computando o resultado (Inferência Fuzzy + Defuzzificação)
# validade_simulador.compute()

#print('A variacao é de %d dias' % round(validade_simulador.output['variacao']))

# Visualizando as regiões
# flebotomineos.view(sim=validade_simulador)
# cond_ambiental.view(sim=validade_simulador)
# variacao.view(sim=validade_simulador)

initial_conditions = [0.7, 0, 0.24, 0.01, 0.6, 0]

#Método Runge-Kutta
# Solucao da EDO
# options = odeset('Abstol',1e-6,'Reltol',1e-6);
# Agora, chame solve_ivp passando validade_simulador como argumento
solution = solve_ivp(fun=lambda t, P: EDO_HVC_Pfuzzy(t, P, simulador),
                     t_span=(tspan[0], tspan[-1]),
                     y0=initial_conditions,
                     t_eval=tspan,
                     args=(),
                     method='RK45',
                     vectorized=False)

# # Obter os resultados
# t = solution.t
# P = solution.y.T 
