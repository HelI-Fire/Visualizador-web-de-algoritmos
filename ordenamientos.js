function quickSort(input) {

    const array = [...input];
    const events = [];

    function partition(low, high) {

        const pivot = array[high];

        let i = low - 1;

        for (let j = low; j < high; j++) {

            events.push(
                createEvent("compare", {
                    indices: [j, high]
                })
            );

            if (array[j] < pivot) {

                i++;

                [array[i], array[j]] =
                    [array[j], array[i]];

                events.push(
                    createEvent("swap", {
                        indices: [i, j],
                        values: [array[i], array[j]]
                    })
                );
            }
        }

        [array[i + 1], array[high]] =
            [array[high], array[i + 1]];

        events.push(
            createEvent("swap", {
                indices: [i + 1, high],
                values: [
                    array[i + 1],
                    array[high]
                ]
            })
        );

        events.push(
            createEvent("sorted", {
                indices: [i + 1]
            })
        );

        return i + 1;
    }


    function sort(low, high) {

        if (low < high) {

            const pivotIndex =
                partition(low, high);

            sort(low, pivotIndex - 1);

            sort(pivotIndex + 1, high);
        }
    }


    sort(0, array.length - 1);

    events.push(
        createEvent("finish", {
            array: [...array]
        })
    );

    return {
        array,
        events
    };
}

function mergeSort(input) {

    const array = [...input];
    const events = [];

    function merge(left, middle, right) {

        const leftPart =
            array.slice(left, middle + 1);

        const rightPart =
            array.slice(middle + 1, right + 1);

        let i = 0;
        let j = 0;
        let k = left;

        while (
            i < leftPart.length &&
            j < rightPart.length
        ) {

            events.push(
                createEvent("compare", {
                    indices: [k, Math.min(k + 1, right)]
                })
            );

            if (leftPart[i] <= rightPart[j]) {
                array[k] = leftPart[i];
                i++;
            } else {
                array[k] = rightPart[j];
                j++;
            }

            events.push(
                createEvent("overwrite", {
                    index: k,
                    value: array[k]
                })
            );

            k++;
        }


        while (i < leftPart.length) {

            array[k] = leftPart[i];

            events.push(
                createEvent("overwrite", {
                    index: k,
                    value: array[k]
                })
            );

            i++;
            k++;
        }


        while (j < rightPart.length) {

            array[k] = rightPart[j];

            events.push(
                createEvent("overwrite", {
                    index: k,
                    value: array[k]
                })
            );

            j++;
            k++;
        }
    }


    function sort(left, right) {

        if (left >= right) {
            return;
        }

        const middle =
            Math.floor((left + right) / 2);

        sort(left, middle);

        sort(middle + 1, right);

        merge(left, middle, right);
    }


    sort(0, array.length - 1);

    events.push(
        createEvent("finish", {
            array: [...array]
        })
    );

    return {
        array,
        events
    };
}