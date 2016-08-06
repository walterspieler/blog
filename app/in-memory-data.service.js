"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var posts = [
            { id: 11, title: 'Mr. Nice' },
            { id: 12, title: 'Narco' },
            { id: 13, title: 'Bombasto' },
            { id: 14, title: 'Celeritas' },
            { id: 15, title: 'Magneta' },
            { id: 16, title: 'RubberMan' },
            { id: 17, title: 'Dynama' },
            { id: 18, title: 'Dr IQ' },
            { id: 19, title: 'Magma' },
            { id: 20, title: 'Tornado' }
        ];
        return { posts: posts };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map