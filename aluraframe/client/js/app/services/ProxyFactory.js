export class ProxyFactory {
    static criar (object, action, ...props) {
        return new Proxy(object, {
            get(target, prop, receiver) { 
                if(props.includes(prop) 
                    && ProxyFactory._isFunction(target[prop])) {
                        return function () {
                            console.log(`inteceptando ${prop}`);
                            let retorno = Reflect.apply(target[prop], target, arguments);
                            action.update(target);
                            return retorno;
                        }
                    }
                    return Reflect.get(target[prop], prop, receiver);
            },
            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) {
                    acao(target);
                }
                return retorno;
            }
        });
    }
    static _isFunction (value) {
        return typeof (value) === typeof (Function);
    }
}

