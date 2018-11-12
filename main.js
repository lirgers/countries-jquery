const deleteButtonCaption = 'Delete';
const sortButtonCaption = "\u{02195}";
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

const onItemClick = function() {
    let row = this.parentElement;
    let panel = row.nextElementSibling;
    if ($(panel).is(":hidden")) {
        $(panel).show("slow");
    } else {
        $(panel).slideUp();
    }
}

const onDelete = function() {
    let item = this.parentElement.parentElement;
    $(item).remove();
};

const createSortRow = function(sort) {
    let $sortButtonContainer = $('<div>');
    $sortButtonContainer.addClass('rowContainer');

    let $sortButton = $('<button>');
    $sortButton.addClass('sortButton');
    $sortButton.text(sortButtonCaption);
    $sortButton.click(sort);

    $sortButtonContainer.append($sortButton);
    return $sortButtonContainer;
}

const createAccordionItem = function(country, description) {
    // create buttons row container
    let $buttonsContainer = $('<div>');
    $buttonsContainer.addClass('rowContainer');

    // create button for expanding country info
    let $countryButton = $('<button>');
    $countryButton.addClass('accordion');
    $countryButton.text(country);

    // create delete button
    let $delButton = $('<button>');
    $delButton.addClass('delButton');
    $delButton.click(onDelete);
    $delButton.text(deleteButtonCaption);

    // create info row container
    let $infoContainer = $('<div>');
    $infoContainer.addClass('rowContainer');
    $infoContainer.addClass('panel');

    // create paragraph element
    let $info = $('<p>');
    $info.addClass('countryInfoP');
    $info.text(description);

    // form elements tree
    let $accordionItem = $('<div>');
    $accordionItem.addClass('item');
    $accordionItem.append($buttonsContainer, $infoContainer);
    $buttonsContainer.append($countryButton, $delButton);
    $infoContainer.append($info);

    $countryButton.click(onItemClick);

    return $accordionItem;
}

const getSortFunc = function() {
    var asc;
    return function() {
        let $items = $('div.item');
        asc = !asc;
        $items.sort(function(a, b) {
            function getTitle(item) {
                return $(item).find('button.accordion').text();
            }
            if (asc) {
                return getTitle(a) > getTitle(b) ? 1 : -1;
            }
            return getTitle(a) < getTitle(b) ? 1 : -1;
        });
        $items.each(function() {
            $('body').append(this);
        });
    };
}

const main = function() {
    let sort = getSortFunc();
    $('body').append(createSortRow(sort));
    countries.forEach(function(item) {
        $('body').append(createAccordionItem(item.title, item.text));
    });
    sort();
};

$(document).ready(main);