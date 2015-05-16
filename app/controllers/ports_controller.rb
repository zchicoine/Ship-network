# TODO review this file and delete unnecessary comments and code

class PortsController < ApplicationController
    before_action :set_port, only: [:show, :edit, :update, :destroy]

    # GET /ports
    # GET /portss.json
    def index
        #@ships = Ship.all
        # @ports = Port.all
    end

    # GET /ports/1
    # GET /ports/1.json
    def show
    end

    # GET /ports/new
    def new

    end

    # GET /ports/1/edit
    def edit
    end

    # POST /ports
    # POST /ports.json
    def create

    end

    # PATCH/PUT /ports/1
    # PATCH/PUT /ports/1.json
    def update

    end

    # DELETE /ports/1
    # DELETE /ports/1.json
    def destroy

    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_port

    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def port_params

    end
end