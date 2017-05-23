// var _user$project$Native_FileReader = function() {
const _user$project$Native_Transformer = (function() {
    return {
        toJsFunction: fun => {
            // Elm functions are curried and take only one argument.
            // This means we would have to call them like this:
            //        sum(2)(3)
            // Here we create a little wrapper to let us call the like this:
            //        sum(2, 3)
            const arity = fun.arity;

            return (...args) => {
                return args
                    .slice(0, arity)
                    .reduce((result, argument) => result(argument), fun);
            };
        }
    };
})();
