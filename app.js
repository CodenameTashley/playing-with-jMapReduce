var JMapReduce = require('jmapreduce');

const PORT = process.env.PORT || 3000;

var JMapReduce = require('jmapreduce');
var input = "A MapReduce program is composed of a Map() procedure (method) that\n" +
    " performs filtering and sorting\n" +
    "(such as sorting students by first name into queues,\n" +
    " one queue for each name) and a Reduce() method that \n" +
    "performs a summary operation (such as counting the number\n" +
    " of students in each queue, yielding name frequencies).\n\n" +
    " The 'MapReduce System' (also called 'infrastructure' or 'framework')\n" +
    " orchestrates the processing by marshalling\n\n\n" +
    " the distributed servers, running the various tasks in parallel,\n" +
    " managing all communications and data transfers\n" +
    " between the various parts of the system, and providing for redundancy\n" +
    " and fault tolerance.\n" +
    " The model is inspired by the map and reduce functions commonly\n" +
    " used in functional programming, although their \n" +
    "purpose in the MapReduce framework is not the same as in their\n" +
    " original forms. The key contributions of \n" +
    "the MapReduce framework are not the actual map and reduce functions,\n" +
    " but the scalability and fault-tolerance\n" +
    " achieved for a variety of applications by optimizing\n" +
    " the execution engine once. As such, a single-threaded\n" +
    " implementation of MapReduce will usually not be faster than\n" +
    " a traditional (non-MapReduce) implementation,\n" +
    " any gains are usually only seen with multi-threaded implementations.\n" +
    " The use of this model is beneficial\n" +
    " only when the optimized distributed shuffle operation (which reduces\n" +
    " network communication cost) and fault tolerance\n" +
    " features of the MapReduce framework come into play. Optimizing the communication\n" +
    " cost is essential to a good MapReduce algorithm.";

var jmapReduce = new JMapReduce();
jmapReduce.textData(input)
    .flatMap(function (data) {
        return data.match(/[^\s]+|\s+[^\s+]$/g);
    })
    .map(function (x) {
        return {
            key: x,
            value: 1
        };
    })
    .groupByKey()
    .reduce(0, function (a, b) {
        return a + b;
    })
    .sort(function (a, b) {
        return b.value - a.value;
    });

console.log("%s", JSON.stringify(jmapReduce.collect().slice(0, 10), null, 2));