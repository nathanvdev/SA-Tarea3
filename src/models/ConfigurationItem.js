import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class ConfigurationItem extends Model {}

ConfigurationItem.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ci_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    serial_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    version: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    acquisition_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    current_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    environment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    physical_location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    license_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    license_expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    security_level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    compliance_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    configuration_status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    documentation_link: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    incident_links: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
    },
    last_change_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    last_change_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'ConfigurationItem',
    timestamps: true,
});

export default ConfigurationItem;