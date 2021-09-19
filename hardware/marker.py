from cortex import Cortex
import time

class Marker():
	def __init__(self):
		self.c = Cortex(user, debug_mode=True)
		self.c.do_prepare_steps()

	def add_markers(self, marker_numbers):
		for m in range(marker_numbers):
			marker_time = time.time()*1000
			print('add marker at : ', marker_time)
			
			marker = {
				"label":str(m),
				"value":"test_marker",
				"port":"python-app",
				"time":marker_time
			}

			self.c.inject_marker_request(marker)

			# add marker each seconds
			time.sleep(3)


	def demo_add_marker(self, record_export_folder, marker_numbers):
		# create record
		record_name = 'demo marker'
		record_description = 'demo marker'
		self.c.create_record(record_name, record_description)

		self.add_markers(marker_numbers)

		self.c.stop_record()

		self.c.disconnect_headset()

		# export record
		record_export_data_types = ['EEG', 'MOTION', 'PM', 'BP']
		record_export_format = 'CSV'
		record_export_version = 'V2'
		self.c.export_record(record_export_folder,
							record_export_data_types,
							record_export_format,
							record_export_version,
							[self.c.record_id])

# -----------------------------------------------------------
# 
# SETTING
# 	- replace your license, client_id, client_secret to user dic
# 	- specify infor for record and export
# 	- connect your headset with dongle or bluetooth, you should saw headset on EmotivApp
#
# RESULT
# 	- this demo add marker each 3 seconds
# 	- export data file should contain marker added
#
# -----------------------------------------------------------
user = {
	"license" : "basic",
	"client_id" : "F3pGZwudS4g0eeugvmzUhscoTYBmTgEwfqqkGHjI",
	"client_secret" : "QceK45g17ZKdYCCyQVUS3XYJX5MpXffDJ6I1hv24RJ5lHjG7VHMSSZhG19X1MftQpNiGxhXp0kLmRXzQqZcArwFlF3CfprSSGLDpsOll6qQW7U3FJ5Q0UFwOAFc5cgkD",
	"debit" : 100
}

m = Marker()


# start record --> add marker --> stop record --> disconnect headset --> export record
record_export_folder = 'your place to export, you should have write permission, example on desktop'
marker_numbers = 10
m.demo_add_marker(record_export_folder, marker_numbers)
# ----------------------------------------------
### credits: Emotiv corp. tutorials in Python
