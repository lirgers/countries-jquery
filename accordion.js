const deleteButtonCaption = 'Delete';
const sortButtonCaption = "\u{02195}";

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

const drawCountries = function($container, countries) {
    const sort = getSortFunc();
    $container.append(createSortRow(sort));
    countries.forEach(function(item) {
        $container.append(createAccordionItem(item.title, item.text));
    });
    sort();
}
