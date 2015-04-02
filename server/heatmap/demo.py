from heatmap import VideoBuilder
import numpy as np

Sensors = np.array([[100,100,240,450,500,540,430,500],[400,400,234,450,280,299,300,450],[1000, 1000, 255,150,500,450,800,450]])
VideoBuilder(Sensors, 10)