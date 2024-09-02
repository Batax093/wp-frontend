export const BASE_URL = "https://wp-backend-ashy.vercel.app/api";

const API = async (
  url,
  options = {
    method: "GET",
    body: {},
    headers: {},
    responseType: "json",
  }
) => {
  const requestOptions = {
    method: options.method,
    headers: options.headers,
    body: JSON.stringify(options.body),
  };

  // Adjust the request options if method is GET or HEAD, where body is not allowed
  if (options.method === "GET" || options.method === "HEAD") {
    delete requestOptions.body;
  }

  try {
    const response = await fetch(`${BASE_URL}/${url}`, requestOptions);

    // Check if the response is successful (status code 200-299)
    if (response.sstatus === 200) {
      // Parse the response based on the expected responseType
      switch (options.responseType) {
        case "json":
          return response.json();
        case "text":
          return response.text();
        case "blob":
          return response.blob();
        default:
          return response.json();
      }
    } else {
      return response; // Return the full response object if not successful
    }
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};

const apiProvider = {
  // Projects
  GetProjects: async () => {
    return API("projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      return err;
    });
  },
  PostProjects: async ({ title, description, image, github }) => {
    return API("projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, image, github }),
    });
  },
  DeleteProjects: async (slug) => {
    return API(`projects/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  UpdateProjects: async (slug, params) => {
    return API(`projects/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  },

  // Skills
  GetSkills: async () => {
    return API("skill/get-skill", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  PostSkills: async ({ name, icon }) => {
    return API("skill/add-skill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, icon }),
    });
  },
  DeleteSkills: async (slug) => {
    return API(`skill/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  UpdateSkills: async (slug, params) => {
    return API(`skill/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  },

  // Admin
  LoginAdmin: async (email, password) => {
    return API("admin-api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  },
  LogoutAdmin: async () => {
    return API("admin-api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Feedback
  PostFeedback: async ({ name, email, message }) => {
    return API("feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });
  },
  
  GetFeedback: async () => {
    return API("feedback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  DeleteFeedback: async (slug) => {
    return API(`feedback/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export default apiProvider;
