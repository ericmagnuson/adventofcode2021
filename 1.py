file = open('1.txt', 'r')
lines = file.readlines()
depths = [int(depth.strip()) for depth in lines]

def get_increases(depths):
    lastValue = -1
    depthIncreaseCount = 0

    for depth in depths:
        # print("{} => {}".format(lastValue, depth))
        if (lastValue != -1) and (depth > lastValue):
            depthIncreaseCount += 1
        lastValue = depth

    print("Increases {}".format(depthIncreaseCount))
    return depthIncreaseCount

def get_windowed_increases(depths):

    sums = [
        sum(depths[i : i + 3])
        for i in range(len(depths) - 3 + 1)
    ]

    return get_increases(sums)



get_increases(depths)
get_windowed_increases(depths)
