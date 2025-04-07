===============================================================
LOTKA-VOLTERRA PREDATOR-PREY MODEL SIMULATOR
===============================================================

Created by Jason Brar
https://jasonbrar.vercel.app/

===============================================================
MATHEMATICAL EQUATIONS
===============================================================

The Lotka-Volterra model describes the dynamics of biological systems in which two species interact - a predator and its prey. The model consists of a pair of first-order non-linear differential equations:

1. Prey Population Equation:
   dx/dt = αx - βxy

   Where:
   - x is the prey population size
   - dx/dt represents the rate of change of the prey population
   - α is the prey growth rate (natural reproduction rate without predators)
   - β is the predation rate (rate at which predators encounter and consume prey)
   - xy represents the interaction between predators and prey

2. Predator Population Equation:
   dy/dt = δxy - γy

   Where:
   - y is the predator population size
   - dy/dt represents the rate of change of the predator population
   - δ is the predator efficiency (rate at which consumed prey converts to predator births)
   - γ is the predator death rate (natural mortality rate without prey)
   - xy represents the interaction between predators and prey

===============================================================
BEHAVIORS & DYNAMICS
===============================================================

The Lotka-Volterra model produces several key behaviors:

1. Cyclic Oscillations: 
   Predator and prey populations oscillate in cycles that are out of phase with each other. 
   When prey increase, predators follow, which then decreases prey, causing predator decline.

2. Phase Relationships:
   - Prey population peaks before predator population
   - Predator decline follows prey decline
   - Prey recovery begins when predator numbers are low

3. Parameter Effects:
   - Higher α (prey growth rate): faster cycles, higher prey peaks
   - Higher β (predation rate): stronger prey decline, lower prey population
   - Higher γ (predator death rate): slower predator response, higher prey peaks
   - Higher δ (predator growth efficiency): faster predator growth, lower prey population

4. Equilibrium Points:
   The system has two equilibrium states:
   - Trivial equilibrium: x=0, y=0 (extinction of both species)
   - Non-trivial equilibrium: x=γ/δ, y=α/β (stable populations)

===============================================================
MODEL LIMITATIONS
===============================================================

The basic Lotka-Volterra model makes several simplifying assumptions:

1. Prey have unlimited food supply and grow exponentially without predators
2. Predator population depends entirely on prey availability
3. Rate of predation depends on likelihood of predator-prey encounters
4. Environment does not change in favor of either species
5. Predators have an infinite appetite
6. No migration of species into or out of the environment
7. No genetic adaptation or evolution

===============================================================
HOW TO USE THE SIMULATOR
===============================================================

1. Set the parameters using the input fields:
   - α (alpha): Prey growth rate
   - β (beta): Predation rate
   - γ (gamma): Predator death rate
   - δ (delta): Predator growth efficiency
   - x₀: Initial prey population
   - y₀: Initial predator population

2. Click "Execute Simulation" to run the model

3. Observe the population dynamics in the graph

4. Try different parameter combinations to see how they affect the system behavior

===============================================================
MATHEMATICAL BACKGROUND
===============================================================

The Lotka-Volterra equations were independently developed by:
- Alfred J. Lotka (1925) - Elements of Physical Biology
- Vito Volterra (1926) - Variazioni e fluttuazioni del numero d'individui in specie animali conviventi

These equations form the basis of many models in population ecology and have been extended to include more complex interactions, carrying capacities, and additional species.

=============================================================== 