const main = function() {
    const countries = [
        {
            "title": "United Kingdom",
            "text": "The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom (UK) or Britain, is a sovereign state in Europe."
        }, {
            "title": "France",
            "text": "France, officially the French Republic (French: R\u00e9publique fran\u00e7aise), is a unitary sovereign state comprising territory in western Europe and several overseas regions and territories."
        },
        {
            "title": "Spain",
            "text": "Spain (Spanish: Espa\u00f1a), officially the Kingdom of Spain (Spanish: Reino de Espa\u00f1a), is a sovereign state located on the Iberian Peninsula in southwestern Europe."
        }, {
            "title": "Germany",
            "text": "Germany, officially the Federal Republic of Germany (German: Bundesrepublik Deutschland), is a federal parliamentary republic in western-central Europe."
        }
    ];
    drawAccordion($('body'), countries);
};

$(document).ready(main);