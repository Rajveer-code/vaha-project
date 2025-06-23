from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

import random
from datetime import datetime, timedelta

VEHICLES = [
    {"id":"MH-01-AB-1234","model":"Hero Splendor+","owner":"Rajesh Kumar","phone":"+91-9876543210",
     "type":"two-wheeler","location":"Andheri, Mumbai","mileage":24500,"riskLevel":"high",
     "predictedIssue":"Brake Pad Wear","daysLeft":8,"confidence":0.91,
     "bookingStatus":"confirmed","nextService":"Oct 24, 2025, 2:00 PM",
     "vin":"MBLHA10E09H123456","lastService":"Jul 2025",
     "telemetry":{"engine_temp":"87°C","battery_voltage":"12.4V","brake_pressure":"67%","tire_pressure_front":"28 PSI","tire_pressure_rear":"30 PSI","fuel_level":"45%","odometer":"24,500 km","last_updated":"2 min ago"}},
    {"id":"DL-05-CD-5678","model":"Mahindra XUV700","owner":"Priya Sharma","phone":"+91-9765432101",
     "type":"four-wheeler","location":"Connaught Place, Delhi","mileage":18200,"riskLevel":"medium",
     "predictedIssue":"Chain Lubrication","daysLeft":22,"confidence":0.78,
     "bookingStatus":"pending","nextService":None,
     "vin":"MA1YS2HGXM7000123","lastService":"May 2025",
     "telemetry":{"engine_temp":"76°C","battery_voltage":"13.1V","brake_pressure":"85%","tire_pressure_front":"35 PSI","tire_pressure_rear":"35 PSI","fuel_level":"72%","odometer":"18,200 km","last_updated":"5 min ago"}},
    {"id":"KA-03-EF-9012","model":"Hero HF Deluxe","owner":"Amit Patel","phone":"+91-9654321012",
     "type":"two-wheeler","location":"Koramangala, Bangalore","mileage":31200,"riskLevel":"low",
     "predictedIssue":"Routine Maintenance","daysLeft":45,"confidence":0.65,
     "bookingStatus":"scheduled","nextService":"Nov 10, 2025",
     "vin":"MBLHA10EX9H234567","lastService":"Aug 2025",
     "telemetry":{"engine_temp":"72°C","battery_voltage":"12.8V","brake_pressure":"91%","tire_pressure_front":"29 PSI","tire_pressure_rear":"31 PSI","fuel_level":"33%","odometer":"31,200 km","last_updated":"1 min ago"}},
]

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/vehicles')
def vehicles():
    return render_template('vehicles.html')

@app.route('/hera')
def hera():
    return render_template('hera.html')

@app.route('/service-centers')
def service_centers():
    return render_template('service_centers.html')

@app.route('/manufacturing')
def manufacturing():
    return render_template('manufacturing.html')

@app.route('/ueba')
def ueba():
    return render_template('ueba.html')

@app.route('/analytics')
def analytics():
    return render_template('analytics.html')

@app.route('/vehicle/<vehicle_id>')
def vehicle_detail(vehicle_id):
    vehicle = next((v for v in VEHICLES if v['id'] == vehicle_id), None)
    if not vehicle:
        return "Vehicle not found", 404
    return render_template('vehicle_detail.html', vehicle=vehicle)

@app.route('/api/vehicles')
def api_vehicles():
    data = []
    for v in VEHICLES:
        vd = dict(v)
        vd['daysLeft'] = max(1, v['daysLeft'] + random.randint(-1,1))
        data.append(vd)
    return jsonify(data)

@app.route('/api/metrics')
def api_metrics():
    high_risk = sum(1 for v in VEHICLES if v['riskLevel']=='high')
    scheduled = sum(1 for v in VEHICLES if v['bookingStatus'] in ['confirmed','scheduled','booked'])
    return jsonify({
        'totalVehicles': len(VEHICLES),
        'highRisk': high_risk,
        'scheduledServices': scheduled,
        'avgUptime': round(random.uniform(94.5, 97.2), 1)
    })

AGENT_LOG_ENTRIES = []
def get_agent_log():
    agents = ["MasterAgent","DataAnalysisAgent","DiagnosisAgent","SchedulingAgent","HERAAgent","FeedbackAgent"]
    actions = [
        "Telemetry ingested for MH-01-AB-1234 — brake pressure drop detected",
        "RUL prediction complete: 8 days remaining — escalating to DiagnosisAgent",
        "Diagnosis confirmed: brake pad wear threshold exceeded",
        "Checking Hero World Andheri availability — Thursday 2pm slot open",
        "HERA outbound call initiated for Rajesh Kumar",
        "Appointment confirmed and SMS sent to +91-9876543210",
        "Manufacturing feedback queued: AutoParts India batch ID AP2024-B112",
        "UEBA baseline check passed for all active agents",
    ]
    now = datetime.now()
    entries = []
    for i, (agent, action) in enumerate(zip(agents, actions)):
        ts = (now - timedelta(seconds=i*47)).strftime("%H:%M:%S")
        entries.append({"timestamp": ts, "agent": agent, "message": action})
    return entries

@app.route('/api/agent-log')
def api_agent_log():
    return jsonify(get_agent_log())

@app.route('/api/fleet-history')
def api_fleet_history():
    dates = []
    high_risk = []
    base = datetime.now()
    for i in range(29, -1, -1):
        d = base - timedelta(days=i)
        dates.append(d.strftime('%b %d'))
        high_risk.append(random.randint(2, 7))
    return jsonify({'dates': dates, 'highRiskVehicles': high_risk})

SERVICE_CENTERS = [
    {"id":"SC001","name":"Hero World Andheri","address":"Link Road, Andheri West, Mumbai","phone":"022-2673-4521",
     "capacity":12,"current_load":9,"avg_rating":4.7,"weekday_util":75,"weekend_util":140,
     "services":["General Service","Brake Repair","Engine Overhaul","Oil Change","Tyre Service"]},
    {"id":"SC002","name":"Hero Service Bandra","address":"SV Road, Bandra, Mumbai","phone":"022-2655-8899",
     "capacity":8,"current_load":5,"avg_rating":4.5,"weekday_util":60,"weekend_util":110,
     "services":["General Service","Brake Repair","Oil Change","Electrical"]},
    {"id":"SC003","name":"Mahindra Service Powai","address":"Hiranandani, Powai, Mumbai","phone":"022-2570-3344",
     "capacity":15,"current_load":11,"avg_rating":4.8,"weekday_util":72,"weekend_util":95,
     "services":["General Service","Engine Overhaul","AC Service","Tyre","Body Work"]},
]

@app.route('/api/service-centers')
def api_service_centers():
    return jsonify(SERVICE_CENTERS)
