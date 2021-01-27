import urllib.request
import json

def get_suny_map_data(string):
    url = string 
    response = urllib.request.urlopen(url) 
    content_string = response.read().decode() 
    content = json.loads(content_string) 
    lst = []
    lsts = ["STATE UNIVERSITY OF NEW YORK AT ALBANY", "STATE UNIVERSITY OF NEW YORK AT BINGHAMTON", "STATE UNIVERSITY OF NEW YORK AT BUFFALO", "STATE UNIVERSITY OF NEW YORK AT STONY BROOK"]
    for i in content:
        if (("lat1" in i.keys()) and ("long1" in i.keys()) and ("campus" in i.keys())) and i["campus"] in lsts:
            lst.append([float(i["lat1"]), float(i["long1"]), i["campus"]])
    return json.dumps(lst)

def get_suny_plot_data(string):
    url = string 
    response = urllib.request.urlopen(url) 
    content_string = response.read().decode() 
    content = json.loads(content_string) 
    lst = []
    lsts = ["Buffalo Univ",  "Albany", "Binghamton", "Stony Brook"]
    for i in content:
        if (("campus_name" in i.keys()) and ("grad_rates_as_of_year" in i.keys()) and ("_4_yr_grad_rate" in i.keys()) and i["campus_name"] in lsts):
            lst.append([i["campus_name"], int(i["grad_rates_as_of_year"][-4:]), float(i["_4_yr_grad_rate"])])
    return json.dumps(lst)

def get_suny_chart_data(string, string1):
    url = string
    url1 = string1 
    response = urllib.request.urlopen(url)
    responses = urllib.request.urlopen(url1) 
    content_string = response.read().decode()
    content_string1 = responses.read().decode() 
    content = json.loads(content_string)
    content1 = json.loads(content_string1) 
    lst = []
    lsts = ["Buffalo Univ",  "Albany", "Binghamton", "Stony Brook"]
    for i in content:
        for j in content1:
            if ((i["college_of_institution_type"].startswith(j["campus_name"])) and (j["grad_rates_as_of_year"]== "Fall 2017") and j["campus_name"] in lsts):
                lst.append([j["campus_name"], int(i["graduate_enrollment"]) + int(i["undergrad_enrollment"]), float(j["_4_yr_grad_rate"]), float(j["_6_yr_grad_rate"]), int(i["graduate_enrollment"]), int(i["undergrad_enrollment"])])
    return json.dumps(lst)