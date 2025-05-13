"use client";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Home,
  FileText,
  User,
  Menu,
  X,
  ChevronRight,
  Edit,
  Loader,
  Download,
  Eye,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import axios from "axios";
import IsoForm from "@/components/forms/iso";
import IsoForm2 from "@/components/forms/iso2";

// Layout Component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("open-forms");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "profile") setActiveTab("profile");
    if (tab === "your-forms") setActiveTab("your-forms");
    if (tab === "open-forms") setActiveTab("open-forms");
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.history.pushState({}, "", `?tab=${tab}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen  bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      {/* <div className="lg:hidden fixed top-0 right-0 z-20 p-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-orange-500 text-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div> */}

      {/* Sidebar - responsive */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out w-64 bg-white shadow-lg ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-500">Dashboard</h1>
        </div>

        <nav className="mt-6">
          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === "open-forms"
                ? "bg-orange-100 border-r-4 border-orange-500"
                : "hover:bg-orange-50"
            }`}
            onClick={() => {
              setActiveTab("open-forms");
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
          >
            <Home
              size={20}
              className={
                activeTab === "open-forms" ? "text-orange-500" : "text-gray-600"
              }
            />
            <span
              className={`ml-4 ${
                activeTab === "open-forms"
                  ? "font-medium text-orange-600"
                  : "text-gray-700"
              }`}
            >
              Open Forms
            </span>
          </div>

          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === "your-forms"
                ? "bg-orange-100 border-r-4 border-orange-500"
                : "hover:bg-orange-50"
            }`}
            onClick={() => {
              setActiveTab("your-forms");
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
          >
            <FileText
              size={20}
              className={
                activeTab === "your-forms" ? "text-orange-500" : "text-gray-600"
              }
            />
            <span
              className={`ml-4 ${
                activeTab === "your-forms"
                  ? "font-medium text-orange-600"
                  : "text-gray-700"
              }`}
            >
              Your Forms
            </span>
          </div>

          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === "profile"
                ? "bg-orange-100 border-r-4 border-orange-500"
                : "hover:bg-orange-50"
            }`}
            onClick={() => {
              setActiveTab("profile");
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
          >
            <User
              size={20}
              className={
                activeTab === "profile" ? "text-orange-500" : "text-gray-600"
              }
            />
            <span
              className={`ml-4 ${
                activeTab === "profile"
                  ? "font-medium text-orange-600"
                  : "text-gray-700"
              }`}
            >
              Profile
            </span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header/Breadcrumbs with mobile toggle integrated */}
        <div className="bg-white shadow-sm z-10 sticky top-0">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Breadcrumbs - left side */}
            <div className="flex items-center text-sm">
              <span className="text-gray-600">Dashboard</span>
              <ChevronRight size={16} className="mx-1 text-gray-400" />
              <span className="font-medium text-orange-600">
                {activeTab === "open-forms" && "Open Forms"}
                {activeTab === "your-forms" && "Your Forms"}
                {activeTab === "profile" && "Profile"}
              </span>
            </div>

            {/* Mobile Toggle - right side */}
            <div className="lg:hidden z-50">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md bg-orange-500 text-white"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto  p-6">
          {activeTab === "open-forms" && <OpenForms />}
          {activeTab === "your-forms" && <YourForms />}
          {activeTab === "profile" && <Profile />}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#00000066] bg-opacity-50 z-0 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function OpenForms() {
  const [userId, setUserId] = useState(null);
  const [filledForms, setFilledForms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define all available forms with their metadata
  const availableForms = {
    "Trademark-and-Iso": {
      id: "Trademark-and-Iso",
      name: "TRADEMARK & ISO DATA",
      description:
        "Application for trademark registration and ISO certification",
      deadline: "June 30, 2025",
      component: IsoForm,
    },
  "ISO Form":{
      id: "iso",
      name: "ISO Form",
      description: "Application for ISO certification",
      deadline: "June 30, 2025",
      component: IsoForm2,
  }    
    // Add more forms here as needed
    /*
    'Another_Form_Template': {
      id: 'Another_Form_Template',
      name: 'Another Form',
      description: 'Description of another form',
      deadline: 'December 31, 2025',
      component: AnotherFormComponent
    }
    */
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        checkFormSubmissions(user.uid);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkFormSubmissions = async (uid) => {
    try {
      const q = query(
        collection(db, "applications"),
        where("userId", "==", uid)
      );
      const querySnapshot = await getDocs(q);

      const filled = querySnapshot.docs.map((doc) => doc.data().templateName);
      setFilledForms(filled);
    } catch (error) {
      console.error("Error checking form submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFillForm = (formId) => {
    setSelectedForm(formId);
    setShowForm(true);
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    if (selectedForm) {
      setFilledForms((prev) => [...prev, selectedForm]);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Available Forms
        </h2>
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin text-orange-500" size={24} />
        </div>
      </div>
    );
  }

  if (showForm && selectedForm && availableForms[selectedForm]) {
    const FormComponent = availableForms[selectedForm].component;
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <button
          onClick={() => setShowForm(false)}
          className="flex items-center text-gray-600 hover:text-orange-500 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to available forms
        </button>
        <FormComponent onSuccess={handleFormSubmitSuccess} />
      </div>
    );
  }

  // Filter out forms that user has already filled
  const unfilledForms = Object.values(availableForms).filter(
    (form) => !filledForms.includes(form.id)
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Available Forms
      </h2>

      {unfilledForms.length > 0 ? (
        <div className="space-y-6">
          {unfilledForms.map((form) => (
            <div
              key={form.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {form.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {form.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Available
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Deadline: {form.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleFillForm(form.id)}
                    className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Fill Form
                    <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No forms available at this time
          </h3>
          <p className="text-gray-600">
            You've either filled all available forms or no forms are currently
            open.
          </p>
        </div>
      )}
    </div>
  );
}

function YourForms() {
  const [userId, setUserId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log(user.uid);
        fetchApplications(user.uid);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchApplications = async (uid) => {
    try {
      console.log("first");
      const q = query(
        collection(db, "applications"),
        where("userId", "==", uid)
      );
      const querySnapshot = await getDocs(q);

      const apps = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() });
      });

      setApplications(apps);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications");
      setLoading(false);
    }
  };

  const handleDownload = async (applicationId, formData) => {
    if (!userId) {
      setError("Please sign in to download the application");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Generate the DOCX document
      const docxResponse = await axios.post("/api/fill-docx", formData, {
        responseType: "blob",
      });

      const docxBlob = new Blob([docxResponse.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(docxBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${formData.templateName} Form ${formData.INS_tm_full_name}.docx`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      setError("Failed to download application");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getFormName = (templateName) => {
    if (templateName === "Trademark-and-Iso") {
      return "TRADEMARK & ISO DATA";
    }
    if (templateName === "iso") {
      return "ISO APPLICATION";
    }
    return templateName || "Application Form";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Payment Pending":
        return "bg-yellow-100 text-yellow-600";
      case "In Review":
        return "bg-blue-100 text-blue-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Submitted":
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading && applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Submitted Forms
        </h2>
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin text-orange-500" size={24} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Submitted Forms
        </h2>
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Submitted Forms
        </h2>
        <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">
          You haven't submitted any forms yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Your Submitted Forms
      </h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="border border-gray-200 p-4 rounded-lg hover:border-orange-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className=" font-semibold text-gray-700">
                  {getFormName(app.templateName)}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Submitted on {formatDate(app.createdAt)} <b>||</b>{" "}
                  <b className="text-orange-400">
                    Updated on {formatDate(app.updatedAt)}
                  </b>
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(app.comments ) ? (
                <div className="bg-gray-100 w-full text-sm  mb-2 p-2 rounded-md">
                  {app.comments}
                </div>
              ) : (
                <div className="bg-gray-100 hidden w-full text-sm  mb-2 p-2 rounded-md">
                  No comments from the admin
                </div>
              )}
              <button
                onClick={() => handleDownload(app.id, app)}
                className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                <Eye size={16} className="mr-1" />
                View
              </button>

              {app.status === "Payment Pending" && (
                <button
                  className="flex items-center px-3 py-1 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  disabled={loading}
                >
                  <ArrowRight size={16} className="mr-1" />
                  Make Payment
                </button>
              )}
              {app.status === "Completed" && (
                <button
                  className="flex items-center px-3 py-1 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  disabled={loading}
                >
                  <ArrowRight size={16} className="mr-1" />
                  Download Docs
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUserId(user.uid);
        console.log(user.uid);
        fetchUserData(user.uid);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setFormData({
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your update logic here to save to Firebase
    // For example:
    await updateDoc(doc(db, "users", userId), {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
    });
    setEditMode(false);
    // Optionally refresh the data
    if (userId) fetchUserData(userId);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Profile
        </h2>
        <div className="animate-pulse space-y-6">
          <div className="flex items-center">
            <div className="bg-gray-200 h-16 w-16 rounded-full"></div>
            <div className="ml-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Profile
        </h2>
        <p className="text-gray-500">No user data found.</p>
      </div>
    );
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userData.fullName || userData.email
  )}&background=random`;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center px-3 py-1 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            <Edit size={16} className="mr-1" />
            Edit
          </button>
        )}
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <h3 className="font-medium text-gray-800">{userData.fullName}</h3>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <h3 className="font-medium text-gray-800">{userData.fullName}</h3>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Account Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-800">{userData.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-800">{userData.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm text-gray-800">
                    {userData.phoneNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-sm text-gray-800 capitalize">
                    {userData.role || "user"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-sm text-gray-800">
                    {userData.createdAt
                      ? formatDate(userData.createdAt)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
