# -*- coding: utf-8 -*-
"""
@author: Panagiotis Stanitsas

Center for Distributed Robotics, University of Minnesota

March 2015

Function description

Input: 
    - Sensors is a (number of sensors) x (Number of frames + 2 (Longitude/Latitude)) Numpy array
    - Delta is the refinement of the grid that we use

"""
import math as mth
import numpy as np
import matplotlib.cm as cm
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt
import scipy.ndimage as ndimage
import os as os
import glob as glob
import scitools.easyviz.movie as movie


def VideoBuilder(Sensors,step):
    
    # Garbage collection/ Erase existing files
    for f in glob.glob('Image_*.eps'):
        os.remove(f)

    d = Sensors.shape
    # Break down the input of the user
    Xcoord = Sensors[:,0]
    Ycoord = Sensors[:,1]
        
    # Boundaries of the grid (leave slack)
    xlow = np.amin(Xcoord) - 300
    xupper = np.amax(Xcoord) + 300
    ylow = np.amin(Xcoord) - 300
    yupper = np.amax(Ycoord) + 300
    
    # Grid construction
    x = np.arange(xlow, xupper, step)
    y = np.arange(ylow, yupper, step)
    X, Y = np.meshgrid(x, y)
    numrows = x.size
    numcols = y.size
    
    # Initialize the time step counter
    timestep = 1;
    
    
    # Start analysing the time steps
    for k in range(2,d[1]):
               
        # Measurements of the time step
        Meas = Sensors[:,k]
        # Initialize the normalizing matrix
        NormMat = np.ones((numrows,numcols))
        # Initialize the value holding matrix
        Multisens = np.mean(Meas) * np.ones((numrows,numcols))    
        
        # Aggregating loop for values and mask accross the sensors
        for i in range(len(Meas)):
            val = Meas[i]
            #print val
            # Generate the associated bivariate normal distribution
            Z1 = mlab.bivariate_normal(X, Y, 12.0, 12.0,Xcoord[i],Ycoord[i], 20.0)
            mask = Z1 > 2 * np.amin(Z1)
            mask.astype(int)
            NormMat += mask
            Multisens += val * mask
        
        # Divide with the number of votes for each location
        Z1 = Multisens / NormMat
        Z = ndimage.gaussian_filter(Z1, sigma = 20.0, order = 0)
        
        # Or you can use a colormap to specify the colors; the default
        # colormap will be used for the contour lines
        plt.figure()
        im = plt.imshow(Z, interpolation='bilinear', origin='lower',
                        cmap=cm.gist_heat, extent=(-xlow,xupper,-ylow,yupper))
        # We need to update that with meaningful values                
        levels = np.arange(np.amin(Z),np.amax(Z),1000)
        
        plt.contour(Z, levels, origin='lower', extent=(-xlow,xupper,-ylow,yupper))
        
        plt.title('Humidity Map | Frame:' + str(timestep))
        plt.xlabel('Longitude (feet)')
        plt.ylabel('Latitude (feet)')
        plt.hot()  # Now change the colormap for the contour lines and colorbar
        plt.flag()
        
        # We can still add a colorbar for the image, too.
        CBI = plt.colorbar(im, ticks=[np.amin(Z),np.mean(Z), np.amax(Z)], orientation='horizontal', shrink=0.7)
        CBI.ax.set_xticklabels(['Min: '+str(mth.ceil(np.amin(Z))),'Mean: '+str(mth.ceil(np.mean(Z))),'Max: '+str(mth.ceil(np.amax(Z)))])
        plt.savefig('Image_' + str(timestep).zfill(4) + '.eps')
        timestep += 1

    # Video creation step
    movie('Image_*.eps', encoder = 'mencoder', output_file = 'C:\Users\nikos\Desktop\movie.mpeg', vcodec='mpeg2video', vbitrate=2400, qscale=4, fps=0.2)
    # Garbage collection/ Erase existing files
    for f in glob.glob('Image_*.eps'):
        os.remove(f)