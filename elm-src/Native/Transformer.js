// var _user$project$Native_FileReader = function() {
const _user$project$Native_Transformer = (function() {
    return {
        toJsFunction: fun => {
            const arity = fun.arity;

            return (...args) => {
                return args
                    .slice(0, arity)
                    .reduce((result, argument) => result(argument), fun);
            };
        }
    };
})();
