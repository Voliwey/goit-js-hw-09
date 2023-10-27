import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function formSubmit(e) {
    e.preventDefault();

    let delay = Number(e.currentTarget.delay.value);
    const step = Number(e.currentTarget.step.value);
    const amount = Number(e.currentTarget.amount.value);

    function createPromise(position, delay) {
        const promise = new Promise((resolve, reject) => {

            const shouldResolve = Math.random() > 0.3;

            setTimeout(() => {
                if (shouldResolve) {
                    resolve({ position, delay });
                } else {
                    reject({ position, delay });
                }
            }, delay);
        });

        return promise;
    }


    for (let position = 1; position <= amount; position += 1) {
        createPromise(position, delay)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(
                    `✅ Fulfilled promise ${position} in ${delay}ms`,
                    {
                        fontSize: '16px',
                        width: '350px',
                        useIcon: false,
                    }
                );
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(
                    `❌ Rejected promise ${position} in ${delay}ms`,
                    {
                        fontSize: '16px',
                        width: '350px',
                        useIcon: false,
                    }
                );
            });

        delay += step;
    }
}

formEl.addEventListener('submit', formSubmit);



// for (let position = 1; position <= amount; position += 1) {
//     createPromise(position, delay)
//         .then(({ position, delay }) => {
//             alert(`✅ Fulfilled promise ${position} in ${delay}ms`)
//         })
//         .catch(({ position, delay }) => {
//             alert(`❌ Rejected promise ${position} in ${delay}ms`)
//         });

//     delay += step;
// }