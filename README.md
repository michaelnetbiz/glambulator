# Glambulator
Application for exploring the CIDOC Conceptual Reference Model (CRM) and phenomena annotated by it at the instance level

## To Do
 * make Entity graph informative (!)
 * implement zoom, dragging to facilitate navigation through the potentially expansive Entity graphs
 * add more Sparql endpoints
 * persist state to local storage

## Data Management
The application implements a Redux store to manage state.

### Why Redux?
That is to say, why not provide data to React components and their children using component state, implementing some flavor of Facebook's Flux application architecture?

#### Local storage API
Persisting state to the browser's local storage is simply a matter of serializing the single state object and deserializing it, setting as the initial state at the beginning of the application lifecycle.

#### Testing
The pure functions encouraged by Redux and middleware like `redux-immutable-state-invariant`, in conjunction with the componentization afforded by React, makes for pleasant unit-testing. With the exception of the asynchronous action creators used in the `entity`, `referenceModel`, and `sparqlQuery` modules, there is no need for mocking.

### Data Model
Within the single state object, the core objects contain data pertaining to the CRM, the SPARQL-querying facility, the instances returned by the SPARQL endpoint, and the status of the various user interface components (e.g., drawer toggled or not, feedback issuing or not). Here is how the application state might look at any given point in time.

    {
      common: {
        currentTab: 'entityGraph',
        feedbackAction: '',
        feedbackContent: '',
        isFeedbackIssuing: false,
        loadingColor: '#3949ab',
        isMobile: false,
        isNavDrawerOpen: false,
        isSparqlQueryDrawerOpen: false
      },
      entity: {
        entities: [
          [
            -202467184,
            {
              type: 'uri',
              value: 'http://collection.britishmuseum.org/id/object/23',
              isFocus: false,
              id: -202467184,
              className: 'britishMuseumCollectionObject',
              groupNumber: 0,
              abbreviatedValue: 'id/object/23',
              index: 0,
              x: 517.0668538912479,
              y: 496.24175125267817,
              vy: 15.751936818846984,
              vx: -7.000978332103126
            }
          ]
        ]
        entityGroupFilter: -1,
        entitySelection: {
          type: 'uri',
          value: 'http://collection.britishmuseum.org/id/object/23',
          isFocus: true,
          id: -202467184,
          className: 'britishMuseumCollectionObject',
          groupNumber: 0,
          abbreviatedValue: 'id/object/23'
        }
        isEntityLoading: false,
        statements: [
          [
            40757526,
            {
              subj: {
                type: 'uri',
                value: 'http://collection.britishmuseum.org/id/object/23',
                isFocus: false,
                id: -202467184,
                className: 'britishMuseumCollectionObject',
                groupNumber: 0,
                abbreviatedValue: 'id/object/23',
                index: 0,
                x: 517.0668538912479,
                y: 496.24175125267817,
                vy: 15.751936818846984,
                vx: -7.000978332103126
              },
              pred: {
                type: 'uri',
                value: 'http://erlangen-crm.org/current/P50_has_current_keeper',
                isFocus: false,
                id: -918561899,
                className: 'ontologyResource',
                groupNumber: 2,
                abbreviatedValue: 'current/P50_has_current_keeper',
                index: 3,
                x: 757.2252906268773,
                y: 356.55481201432383,
                vy: 12.156231433422803,
                vx: 7.547420643036565
              },
              obj: {
                type: 'uri',
                value: 'http://collection.britishmuseum.org/id/the-british-museum',
                isFocus: false,
                id: -1279364364,
                className: 'britishMuseumCollectionObject',
                groupNumber: 0,
                abbreviatedValue: 'id/the-british-museum'
              }
            }
          ]
        ]
      }
      referenceModel: {
        isReferenceModelLoading: false,
        resources: [
          {
            id: 'E1_CRM_Entity',
            type: 'rdfs:Class',
            supers: [],
            name: 'CRM Entity',
            description: 'This class comprises all things in the universe of discourse of the CIDOC Conceptual Reference Model. \nIt is an abstract concept providing for three general properties:\n1.\tIdentification by name or appellation, and in particular by a preferred identifier\n2.\tClassification by type, allowing further refinement of the specific subclass an instance belongs to \n3.\tAttachment of free text for the expression of anything not captured by formal properties\nWith the exception of E59 Primitive Value, all other classes within the CRM are directly or indirectly specialisations of E1 CRM Entity. \n'
          }
        ]
        version: '6.2.1'
        sparqlQuery: {
          sparqlQueryDescription: 'Returns twenty instances of E1_CRM_Entity.',
          sparqlQueryExpression: {
            prefix: 'crm: <http://erlangen-crm.org/current/>',
            'select distinct': '?instance',
            where: '{ ?instance a crm:E1_CRM_Entity }',
            filter: false,
            order: false,
            limit: 20
          },
          isSparqlQueryLoading: false,
          sparqlQueryName: 'isa E1_CRM_Entity',
          sparqlQueryResults: [
            [
              -1279364364,
              {
                type: 'uri',
                value: 'http://collection.britishmuseum.org/id/the-british-museum',
                isFocus: false,
                id: -1279364364,
                className: 'britishMuseumCollectionObject',
                groupNumber: 0,
                abbreviatedValue: 'id/the-british-museum'
              }
            ]
          ]
        }
      }
    }


### State Changes
In keeping with the Redux store pattern, the only ways to change state is by dispatching an action. The actions used to update the data outlined above are listed here.

|ActionType   	            |Module        |Description             |
|-----	                    |-----	       |-----	                  |
|APPLY_ENTITY_GROUP_FILTER  |entity	       |   	                    |
|CLEAR_FEEDBACK             |common        |   	                    |
|GET_ENTITY   	            |entity	       |   	                    |
|GET_ENTITY_FAILURE         |entity	       |   	                    |
|GET_ENTITY_SUCCESS         |entity	       |   	                    |
|GET_REFERENCE_MODEL        |referenceModel|   	                    |
|GET_SPARQL_QUERY           |sparqlQuery   |   	                    |
|GET_SPARQL_QUERY_FAILURE   |sparqlQuery   |   	                    |
|GET_SPARQL_QUERY_SUCCESS   |sparqlQuery   |   	                    |
|RECEIVE_ENTITY             |entity	       |   	                    |
|RECEIVE_REFERENCE_MODEL    |referenceModel|   	                    |
|RECEIVE_SPARQL_QUERY       |sparqlQuery   |   	                    |
|SELECT_ENTITY              |entity	       |   	                    |
|SET_FEEDBACK               |common        |   	                    |
|SET_SPARQL_QUERY           |sparqlQuery   |   	                    |
|SET_TAB                    |common        |   	                    |
|TOGGLE_NAV_DRAWER          |common        |   	                    |
|TOGGLE_SPARQL_QUERY_DRAWER |common        |   	                    |
|UPDATE_ENTITY_DATA         |entity	       |








