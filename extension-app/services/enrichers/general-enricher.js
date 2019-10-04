/* global SYMPHONY */
import { openModal } from 'services/modal-service';
import { frontendURL, setupLinkPrefix } from 'utils/system/setup-url';
import { ENRICHER_EVENTS, MODAL_IDS } from './entities';
import MyEntityBuilder from './template-builders/my-entity-builder';

const LINK_PREFIX = setupLinkPrefix();
const FRONTEND_SERVE_URL = frontendURL();

export default class GeneralEnricher {
  constructor(name) {
    this.name = name;
    this.messageEvents = Object.keys(ENRICHER_EVENTS).map(key => ENRICHER_EVENTS[key].type);
    this.implements = ['render', 'action'];
  }

  static getMessages() {
    return Object.keys(ENRICHER_EVENTS).map(key => ENRICHER_EVENTS[key].type);
  }

  getName() {
    return this.name;
  }

  init() {
    SYMPHONY.services.make(this.name, this, this.implements, true);
  }

  register() {
    const entity = SYMPHONY.services.subscribe('entity');
    this.messageEvents.forEach((element) => {
      entity.registerRenderer(element, {}, this.name);
    });
  }

  render(type, entity) {
    let data = {};
    if (entity.id) {
      data = typeof entity.id === 'object' ? entity.id : JSON.parse(entity.id);
    } else if (entity.payload) {
      data = typeof entity.payload === 'object' ? entity.payload : JSON.parse(entity.payload);
    }

    const actionData = {};
    let template;

    switch (type) {
      case ENRICHER_EVENTS.TESTING.type:
        template = `<messageML>
          <h1>An enriched message!</h1>
          <p>What we got from the entity: ${JSON.stringify(data)}</p>
          <p><b>WOW</b> that's exciting!</p>
        </messageML>`;
        break;
      case ENRICHER_EVENTS.MY_ENTITY.type:
        template = MyEntityBuilder.build(data);
        break;
      default:
        template = `<messageML><p>No template found for this message entity</p><br />Caught: ${type}</messageML>`;
        break;
    }

    return {
      template,
      data: actionData,
    };
  }

  action(data) {
    switch (data.type) {
      case MODAL_IDS.EXAMPLE_MODAL.entity:
        openModal(MODAL_IDS.EXAMPLE_MODAL.entity, this.name, `${FRONTEND_SERVE_URL}${LINK_PREFIX}`, '560px', { page: 'exampleModal' });
        break;
      default:
        openModal('noEntityDialog', this.name, `${FRONTEND_SERVE_URL}${LINK_PREFIX}`, '300px', { page: 'error' });
        break;
    }
  }

  static actionFactory(actions, service, entity) {
    return actions.reduce((result, action) => {
      const actionObj = {};
      const actionId = action.id || action.type;

      const actionData = {
        service,
        label: action.label,
        data: {
          entity,
          service: action.service,
          type: action.type,
          entityData: action.entityData,
        },
      };

      actionObj[actionId] = actionData;
      return Object.assign(result, actionObj);
    }, {});
  }
}
