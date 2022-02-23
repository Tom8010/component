interface interface_component {
  component: any;
  addClassName(className: string): void;
  addId(id: string): void;
  getComponent(): any;
  assignation(...childComponent: any): void;
  assignationElement(...childElement: any): void;
  stir(...child: any): void;
  events(): void;
}

interface datosDeComponent {
  className: string;
  id: string;
  father: string;
}

interface datosDeComponentInput extends datosDeComponent {
  type: string;
}

export default class Component implements interface_component {
  name: string;
  /*componente padre*/
  component: any;
  /*guardado de datos de la clase*/
  memory = [];
  constructor(tagName: string, { className, id, father }: datosDeComponent) {
    this.name = id || className;
    /*creation;*/
    this.component = document.createElement(tagName);

    className ? this.addClassName(className) : 0;
    id ? this.addId(id) : 0;
    father ? document.querySelector(father).appendChild(this.component) : 0;
    this.events();
  }
  addClassName(className: string) {
    this.component.className = className;
  }
  addId(id: string) {
    this.component.id = id;
  }
  getComponent() {
    return this.component;
  }
  assignation(...childComponent: any) {
    childComponent.forEach((x: any) => {
      this.memory.push(x);
      this.component.appendChild(x.getComponent());
    });
  }
  assignationElement(...childElement: any) {
    [childElement].forEach((x) => this.component.appendChild(x));
  }
  stir(...child: any) {
    child.forEach((x: any) => {
      this.component.removeChild(x.getComponent());
    });
  }
  events() {}
}
export class ComponentArticle extends Component {
  constructor({ className, id, father }) {
    super("article", { className, id, father });
  }
}
export class ComponentSection extends Component {
  constructor({ className, id, father }) {
    super("section", { className, id, father });
  }
}
export class ComponentInput extends Component {
  constructor({ className, id, father, type }: datosDeComponentInput) {
    super("input", { className, id, father });
    let _type: string = type;
    _type ? this.addType(_type) : 0;
  }
  addType(_type: string) {
    this.component.type = _type;
  }
}
