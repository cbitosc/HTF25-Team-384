import { Caregiver, HealthDocument, Patient, HealthData, DoctorPatient, PrescriptionRequest, SosAlert } from './types';

export const mockPatient: Patient = {
  id: 'user-01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
};

// For compatibility with UserNav
export const patientUser = {
    name: mockPatient.name,
    email: mockPatient.email,
    avatar: "/avatars/01.png"
}

export const caregivers: Caregiver[] = [
  {
    id: 'care-01',
    name: 'Priya Sharma',
    relationship: 'Daughter',
    avatarUrl: '/avatars/02.png',
  },
  {
    id: 'care-02',
    name: 'Rohan Mehta',
    relationship: 'Health Worker',
    avatarUrl: '/avatars/03.png',
  },
];

export const healthDocuments: HealthDocument[] = [
  {
    id: 'doc-01',
    name: 'Dr. Verma\'s Prescription',
    type: 'prescription',
    date: '2024-05-10',
    url: '#',
  },
  {
    id: 'doc-02',
    name: 'Apollo Labs Blood Test',
    type: 'lab report',
    date: '2024-05-08',
    url: '#',
  },
  {
    id: 'doc-03',
    name: 'Star Health Insurance',
    type: 'insurance',
    date: '2025-01-01',
    url: '#',
  },
];

export const mockHealthData: HealthData = {
    bloodPressureReadings: [150, 155, 160],
    bloodSugarReadings: [180, 190, 200],
    painLevels: [2, 3, 2],
    moodLevels: ['happy', 'neutral', 'happy'],
}

export const mockDoctorPatients: DoctorPatient[] = [
    {
        id: 'patient-101',
        name: 'Sunita Devi',
        age: 68,
        riskLevel: 'Critical',
        lastSeen: '1 day ago',
        symptoms: ['Chest pain', 'High BP'],
        adherence: 65,
        caregiverId: 'care-01',
    },
    {
        id: 'patient-102',
        name: 'Amit Kumar',
        age: 45,
        riskLevel: 'High',
        lastSeen: '3 days ago',
        symptoms: ['Persistent cough', 'Fever'],
        adherence: 80,
    },
    {
        id: 'patient-103',
        name: 'Rajesh Singh',
        age: 52,
        riskLevel: 'Medium',
        lastSeen: '5 days ago',
        symptoms: ['High blood sugar'],
        adherence: 92,
        caregiverId: 'care-02',
    },
    {
        id: 'patient-104',
        name: 'Meena Patel',
        age: 34,
        riskLevel: 'Low',
        lastSeen: '2 days ago',
        symptoms: ['Mild cough', 'Sore throat'],
        adherence: 98,
    }
];

export const mockPrescriptionRequests: PrescriptionRequest[] = [
    {
        id: 'req-001',
        patientName: 'Amit Kumar',
        medication: 'Paracetamol 500mg',
        date: '2024-07-28',
        status: 'Pending',
    },
    {
        id: 'req-002',
        patientName: 'Sunita Devi',
        medication: 'Amlodipine 5mg',
        date: '2024-07-28',
        status: 'Pending',
    },
    {
        id: 'req-003',
        patientName: 'Rajesh Singh',
        medication: 'Metformin 500mg',
        date: '2024-07-27',
        status: 'Approved',
        pharmacyStatus: 'Sent',
    },
];

export const mockSosAlerts: SosAlert[] = [
    {
        id: 'sos-001',
        patientName: 'Sunita Devi',
        reason: 'Severe chest pain and dizziness',
        time: '2 mins ago',
        status: 'Active',
    },
    {
        id: 'sos-002',
        patientName: 'Amit Kumar',
        reason: 'Fall detected, not responding',
        time: '5 mins ago',
        status: 'Active',
    },
     {
        id: 'sos-003',
        patientName: 'Geeta Pawar',
        reason: 'High fever and shortness of breath',
        time: '15 mins ago',
        status: 'Active',
    }
];
