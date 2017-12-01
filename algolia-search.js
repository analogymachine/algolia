/* global instantsearch */

app({
    appId: "3FQ8L3ERIE",
    apiKey: "e361e90deecefaa26fa50833d5d0b360", // search only API key
    indexName: 'SuccessPrimeSearch',
    urlSync: true,
});

function app(opts) {
    const search = instantsearch({
        appId: "3FQ8L3ERIE",
        apiKey: "e361e90deecefaa26fa50833d5d0b360", // search only API key
        indexName: 'SuccessPrimeSearch',
        urlSync: true,
    });

    search.addWidget(
        instantsearch.widgets.searchBox({
            container: '#search-input',
            placeholder: 'Enter search string',
        })
    );

    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            hitsPerPage: 10,
            templates: {
                item: getTemplate('hit'),
                empty: getTemplate('no-results'),
            },
        })
    );

    search.addWidget(
        instantsearch.widgets.stats({
            container: '#stats',
        })
    );

    //https://community.algolia.com/instantsearch.js/documentation/#sortbyselector
    /*search.addWidget(
      instantsearch.widgets.sortBySelector({
        container: '#sort-by',
        autoHideContainer: true,
        indices: [{
          name: opts.indexName, label: 'Most relevant',
        }, {
          name: `${opts.indexName}_Title_asc`, label: 'Title',
        }, {
          name: `${opts.indexName}_Title_desc`, label: 'Highest price',
        }],
      })
    );*/

    search.addWidget(
        instantsearch.widgets.pagination({
            container: '#pagination',
            scrollTo: '#search-input',
        })
    );

    //https://community.algolia.com/instantsearch.js/documentation/#refinementlist
    search.addWidget(
        instantsearch.widgets.refinementList({
            container: '#Facet1',
            attributeName: 'Facet1',
            sortBy: ['isRefined', 'count:desc', 'name:asc'],
            limit: 10,
            operator: 'or',
            templates: {
                header: getHeader('ROLE'),
            },
        })
    );

    search.addWidget(
        instantsearch.widgets.refinementList({
            container: '#Facet2',
            attributeName: 'Facet2',
            sortBy: ['isRefined', 'count:desc', 'name:asc'],
            limit: 10,
            operator: 'or',
            templates: {
                header: getHeader('PRODUCT'),
            },
        })
    );

    search.addWidget(
        instantsearch.widgets.refinementList({
            container: '#Facet3',
            attributeName: 'Facet3',
            sortBy: ['isRefined', 'count:desc', 'name:asc'],
            limit: 10,
            operator: 'or',
            templates: {
                header: getHeader('TOPIC'),
            },
        })
    );

    search.start();
}

function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
    return `<h5>${title}</h5>`;
}