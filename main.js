const methods = document.querySelector('#method'); // The <select> element
const epsValue = document.querySelector('#eps');
const nValue = document.querySelector('#n');
const calculateBtn = document.querySelector('.calculate__btn');
const midpointValue = document.querySelector('#midpoint');
const trapezoidsValue = document.querySelector('#trapezoids');
const simpsonValue = document.querySelector('#simpson');
const monteCarloValue = document.querySelector('#monte_carlo');
const exactValue = document.querySelector('#exactvalue');
const N_PrValue = document.querySelector('#N_Pr');
const N_TrValue = document.querySelector('#N_Tr');
const N_SimpValue = document.querySelector('#N_Simp');
const N_MonteCarlo = document.querySelector('#N_MonteCarlo');

function f(x) {
    return 1 / (1 + x + Math.pow(x, 2));
}

function sum(m, x, w) {
    let s = 0;
    for (let i = 0; i < m; i++) {
        s += f(x + i * w);
    }
    return s;
}

function MonteCarlo(a, b, N) {
    let M = 0.0;
    let step = 0.01;

    for (let x = a; x <= b; x += step) {
        let fx = f(x);
        if (fx > M) M = fx;
    }

    let Nt = 0;
    let S = (b - a) * M;

    for (let i = 0; i < N; i++) {
        let x = a + (b - a) * Math.random();
        let y = M * Math.random();
        if (y <= f(x)) {
            Nt += 1;
        }
    }

    return S * (Nt / N);
}

calculateBtn.addEventListener('click', () => {
    let a = 0, b = 1;
    let eps = parseFloat(epsValue.value);
    let n = parseInt(nValue.value);
    let h = (b - a) / n;
    let int_new, int_old = 0;

    exactValue.value = (Math.PI / (3 * Math.sqrt(3))).toFixed(6);

    const selectedMethod = methods.value;

    while (true) {
        switch (selectedMethod) {
            case "midpoint":
                int_new = h * sum(n, a + h / 2, h);
                midpointValue.value = int_new.toFixed(6);
                N_PrValue.value = n;
                break;
            case "trapezoids":
                int_new = h * 0.5 * (f(a) + f(b)) + h * sum(n - 1, a + h, h);
                trapezoidsValue.value = int_new.toFixed(6);
                N_TrValue.value = n;
                break;
            case "simpson":
                int_new = h * (f(a) + f(b) + 4 * sum(n, a + h / 2, h) + 2 * sum(n - 1, a + h, h)) / 6;
                simpsonValue.value = int_new.toFixed(6);
                N_SimpValue.value = n;
                break;
            case "monte_carlo":
                int_new = MonteCarlo(a, b, n); 
                monteCarloValue.value = int_new.toFixed(6);
                N_MonteCarlo.value = n;
                break;
        }

        if (Math.abs(int_new - int_old) <= eps) break;

        int_old = int_new;
        n++;
        h = (b - a) / n;
    }
});