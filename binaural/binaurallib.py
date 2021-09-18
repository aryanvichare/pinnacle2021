#!/usr/bin/env python
# encoding: utf-8
 
"""
from: http://en.wikipedia.org/wiki/Binaural_beats
 
Binaural beats or binaural tones are auditory processing artifacts, or apparent sounds, 
the perception of which arises in the brain for specific physical stimuli. This effect 
was discovered in 1839 by Heinrich Wilhelm Dove.
 
The brain produces a phenomenon resulting in low-frequency pulsations in the loudness 
and sound localization of a perceived sound when two tones at slightly different frequencies 
are presented separately, one to each of a subject's ears, using stereo headphones. A 
beating tone will be perceived, as if the two tones mixed naturally, out of the brain. 
The frequency of the tones must be below about 1,000 to 1,500 hertz for the beating to 
be heard. The difference between the two frequencies must be small (below about 30 Hz) 
for the effect to occur; otherwise, the two tones will be heard separately and no beat 
will be perceived.
 
Binaural beats are of interest to neurophysiologists investigating the sense of hearing. 
Second, binaural beats reportedly influence the brain in more subtle ways through the 
entrainment of brainwaves[1][2] and can be used to reduce anxiety[3] and provide other 
health benefits such as control over pain.[4]
 
props to:
1) http://mail.python.org/pipermail/python-list/2009-June/1207339.html
2) http://www.daniweb.com/code/snippet263775.html
"""
 
import math
import wave
import struct
import array
 
def make_soundfile(left_freq=440, right_freq=460, data_size=50000, fname="test.wav", amp=18000.0):
    """
    create a synthetic 'sine wave' wave file with frequency freq
    file fname has a length of about data_size * 2
    """
    frate = 11025.0  # framerate as a float
    # amp = 8000.0     # multiplier for amplitude
 
    # make a sine list ...
    sine_list = []
    for x in range(data_size):
        left = math.sin(2*math.pi*left_freq*(x/frate))
        right = math.sin(2*math.pi*right_freq*(x/frate))
        sine_list.append((left,right))
 
    # get ready for the wave file to be saved ...
    wav_file = wave.open(fname, "w")
    # give required parameters
    nchannels = 2
    sampwidth = 2
    framerate = int(frate)
    nframes = data_size
    comptype = "NONE"
    compname = "not compressed"
    # set all the parameters at once
    wav_file.setparams((nchannels, sampwidth, framerate, nframes,
        comptype, compname))
    # now write out the file ...
    print( "may take a moment ..." )
    for s in sine_list:
        data = array.array('h')
        data.append(int(s[0]*amp/2)) # left channel
        data.append(int(s[1]*amp/2)) # write channel
        # write the audio frames to file
        # wav_file.writeframes(data.tostring())
        wav_file.writeframes(data.tobytes())
    wav_file.close()
    print( "%s written" % fname )
 
 
def genfile(lf, rf, ds, wname):

        # set some variables ...


        left_freq = lf
        right_freq = rf
        
        # left_freq = 440.0
        # right_freq = 460.0



        # data size, file size will be about 2 times that
        # duration is about 4 seconds for a data_size of 40000, 31 seconds  for data size of 350000
        
        data_size = ds
        # data_size = 350000
        
        # write the synthetic wave file to ...
        fname = wname + "_binaural_%s_%s.wav" % (left_freq, right_freq)
        
        make_soundfile(left_freq, right_freq, data_size, fname)


        return fname



##test generator


##delta is 1 - 3 Hz

# print (genfile(440.0, 441.0, 350000, "delta-1hz-RH" ))
# print (genfile(440.0, 442.0, 350000, "delta-2hz-RH" ))
# print (genfile(440.0, 443.0, 350000, "delta-3hz-RH" ))


##theta is 4 - 7 hz
# print (genfile(440.0, 444.0, 350000, "theta-4hz-RH" ))
# print (genfile(440.0, 445.0, 350000, "theta-5hz-RH" ))
# print (genfile(440.0, 446.0, 350000, "theta-6hz-RH" ))
# print (genfile(440.0, 447.0, 350000, "theta-7hz-RH" ))

##alpha is 8 - 12 hz 

# print (genfile(440.0, 448.0, 350000, "alpha-8hz-RH" ))
# print (genfile(440.0, 449.0, 350000, "alpha-9hz-RH" ))
# print (genfile(440.0, 450.0, 350000, "alpha-10hz-RH" ))
# print (genfile(440.0, 451.0, 350000, "alpha-11hz-RH" ))
# print (genfile(440.0, 452.0, 350000, "alpha-12hz-RH" ))

##beta is 13 to 25 hz

# print (genfile(440.0, 453.0, 350000, "beta-13hz-RH" ))
# print (genfile(440.0, 454.0, 350000, "beta-14hz-RH" ))
# print (genfile(440.0, 455.0, 350000, "beta-15hz-RH" ))
# print (genfile(440.0, 456.0, 350000, "beta-16hz-RH" ))
# print (genfile(440.0, 457.0, 350000, "beta-17hz-RH" ))
# print (genfile(440.0, 458.0, 350000, "beta-18hz-RH" ))
# print (genfile(440.0, 459.0, 350000, "beta-19hz-RH" ))
# print (genfile(440.0, 460.0, 350000, "beta-20hz-RH" ))
# print (genfile(440.0, 461.0, 350000, "beta-21hz-RH" ))
# print (genfile(440.0, 462.0, 350000, "beta-22hz-RH" ))
# print (genfile(440.0, 463.0, 350000, "beta-23hz-RH" ))
# print (genfile(440.0, 464.0, 350000, "beta-24hz-RH" ))
# print (genfile(440.0, 465.0, 350000, "beta-25hz-RH" ))

##gamma is >25hz

print (genfile(440.0, 466.0, 350000, "gamma-26hz-RH" ))
print (genfile(440.0, 467.0, 350000, "gamma-27hz-RH" ))
print (genfile(440.0, 468.0, 350000, "gamma-28hz-RH" ))
print (genfile(440.0, 469.0, 350000, "gamma-29hz-RH" ))
print (genfile(440.0, 470.0, 350000, "gamma-30hz-RH" ))
print (genfile(440.0, 471.0, 350000, "gamma-31hz-RH" ))
print (genfile(440.0, 472.0, 350000, "gamma-32hz-RH" ))
print (genfile(440.0, 473.0, 350000, "gamma-33hz-RH" ))
print (genfile(440.0, 474.0, 350000, "gamma-34hz-RH" ))
print (genfile(440.0, 475.0, 350000, "gamma-35hz-RH" ))

