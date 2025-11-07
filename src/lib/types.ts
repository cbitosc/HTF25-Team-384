export type Patient = {
  id: string;
  name: string;
  email: string;
};

export type Caregiver = {
  id: string;
  name: string;
  relationship: string;
  avatarUrl: string;
};

export type HealthDocument = {
  id: string;
  name: string;
  type: 'prescription' | 'lab report' | 'insurance';
  date: string;
  url: string;
};

export type HealthData = {
    bloodPressureReadings: number[];
    bloodSugarReadings: number[];
    painLevels: number[];
    moodLevels: string[];
}

export type DoctorPatient = {
    id: string;
    name: string;
    age: number;
    riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    lastSeen: string;
    symptoms: string[];
    adherence: number;
    caregiverId?: string;
}

export type PrescriptionRequest = {
    id: string;
    patientName: string;
    medication: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    pharmacyStatus?: 'Pending' | 'Sent';
};

export type SosAlert = {
    id: string;
    patientName: string;
    reason: string;
    time: string;
    status: 'Active' | 'Dismissed';
};
