const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '' ,//Introduce aquí tu API-Key
        'X-RapidAPI-Host': '' //Introduce aquí tu API-Host
    }
};

const fetchIpInfo = async (ip) => {
    try {
        const response = await fetch(`https://ip-directory.p.rapidapi.com/lookup/${ip}?risk=true&hostname=false`, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch IP info');
    }
};

const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $submit = document.querySelector('#submit');
const $results = document.querySelector('#results');

$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { value } = $input;
    if (!value) return;

    try {
        $submit.setAttribute('disabled', '');
        $submit.setAttribute('aria-busy', 'true');

        const ipInfo = await fetchIpInfo(value);

        if (ipInfo) {
            $results.innerHTML = JSON.stringify(ipInfo, null, 2);
        }
    } catch (error) {
        console.error(error);
        // Manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
    } finally {
        $submit.removeAttribute('disabled');
        $submit.removeAttribute('aria-busy');
    }
});
