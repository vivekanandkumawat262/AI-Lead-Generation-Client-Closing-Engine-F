from dotenv import load_dotenv
load_dotenv()
# app/main.py
from fastapi import FastAPI
from .database import Base, engine
from .routes import leads, ai, outreach, replies, proposals, payments, auth, email_logs, stripe_webhook
from .routes import users
from fastapi.middleware.cors import CORSMiddleware
from app.routes import webhooks
<<<<<<< HEAD

=======
         
>>>>>>> b87aec80181b986af2a46060389d487668364994

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CRM AutoPilot")

app.include_router(leads.router)
app.include_router(ai.router)
app.include_router(outreach.router)
app.include_router(replies.router)
app.include_router(proposals.router)
app.include_router(payments.router)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(email_logs.router)
app.include_router(stripe_webhook.router)

app.include_router(webhooks.router)

app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=["*","http://localhost:5173"],
=======
    allow_origins=["http://localhost:5173","https://ai-lead-generation-client-closing-e.vercel.app"],
>>>>>>> b87aec80181b986af2a46060389d487668364994
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "CRM AutoPilot Backend Running"}



# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "Server OK"}



# from fastapi import FastAPI
# from .database import Base, engine

# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "DB OK"}





# from fastapi import FastAPI
# from .database import Base, engine
# from .routes import leads

# Base.metadata.create_all(bind=engine)

# app = FastAPI()
# app.include_router(leads.router)

# @app.get("/")
# def root():
<<<<<<< HEAD
#     return {"message": "Leads OK"}
=======
#     return {"message": "Leads OK"}
>>>>>>> b87aec80181b986af2a46060389d487668364994
